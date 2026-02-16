import {SESClient, SendEmailCommand} from '@aws-sdk/client-ses';
import {GiveawayEntryCreatedEvent} from '../constants';
import {generateUserEmailHtml} from '../templates/user-email';
import {generateAdminEmailHtml} from '../templates/admin-email';

export class EmailService {
    private readonly sesClient: SESClient;
    private readonly adminEmail: string;
    private readonly fromEmail: string;
    private readonly frontendUrl: string;

    constructor() {
        this.sesClient = new SESClient({
            region: process.env.AWS_REGION || 'us-east-1',
        });

        this.adminEmail = process.env.ADMIN_EMAIL!;
        this.fromEmail = process.env.FROM_EMAIL!;
        this.frontendUrl = process.env.FRONTEND_URL!;

        if (!this.adminEmail || !this.fromEmail || !this.frontendUrl) {
            throw new Error('Missing required environment variables: ADMIN_EMAIL, FROM_EMAIL, or FRONTEND_URL');
        }
    }

    async sendUserConfirmation(event: GiveawayEntryCreatedEvent): Promise<void> {
        const command = new SendEmailCommand({
            Source: this.fromEmail,
            Destination: {
                ToAddresses: [event.email],
            },
            Message: {
                Subject: {
                    Data: '🎉 You\'re Entered in the ThriveLab Giveaway!',
                    Charset: 'UTF-8',
                },
                Body: {
                    Html: {
                        Data: generateUserEmailHtml(event.firstName, this.frontendUrl),
                        Charset: 'UTF-8',
                    },
                },
            },
        });

        await this.sesClient.send(command);
        console.log(`User confirmation email sent to ${event.email}`);
    }

    async sendAdminNotification(event: GiveawayEntryCreatedEvent): Promise<void> {
        const command = new SendEmailCommand({
            Source: this.fromEmail,
            Destination: {
                ToAddresses: [this.adminEmail],
            },
            Message: {
                Subject: {
                    Data: `[ThriveLab] New Giveaway Entry: ${event.firstName} ${event.lastName}`,
                    Charset: 'UTF-8',
                },
                Body: {
                    Html: {
                        Data: generateAdminEmailHtml(event),
                        Charset: 'UTF-8',
                    },
                },
            },
        });

        await this.sesClient.send(command);
        console.log(`Admin notification sent to ${this.adminEmail}`);
    }

    async sendNotifications(event: GiveawayEntryCreatedEvent): Promise<void> {
        await Promise.all([
            this.sendUserConfirmation(event),
            this.sendAdminNotification(event),
        ]);

        console.log(`All notifications sent successfully for entry ${event.entryId}`);
    }
}