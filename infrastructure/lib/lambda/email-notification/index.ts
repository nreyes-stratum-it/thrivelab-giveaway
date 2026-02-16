import {SQSEvent} from 'aws-lambda';
import {GiveawayEntryCreatedEvent} from './constants';
import {EmailService} from './services/email-service';

const emailService = new EmailService();

export const handler = async (
    event: SQSEvent
): Promise<{ batchItemFailures: Array<{ itemIdentifier: string }> }> => {
    console.log('Processing SQS messages:', JSON.stringify(event, null, 2));

    const batchItemFailures: Array<{ itemIdentifier: string }> = [];

    for (const record of event.Records) {
        try {
            const message: GiveawayEntryCreatedEvent = JSON.parse(record.body);

            console.log(`Processing event: ${message.eventType} for entry ${message.entryId}`);

            if (message.eventType === 'GiveawayEntryCreated') {
                await emailService.sendNotifications(message);
            } else {
                console.warn(`Unknown event type: ${message.eventType}`);
            }
        } catch (error) {
            console.error('Error processing message:', {
                messageId: record.messageId,
                error: error instanceof Error ? error.message : 'Unknown error',
                stack: error instanceof Error ? error.stack : undefined,
            });

            batchItemFailures.push({itemIdentifier: record.messageId});
        }
    }

    if (batchItemFailures.length > 0) {
        console.warn(`${batchItemFailures.length} message(s) failed and will be retried`);
    }

    return {batchItemFailures};
};