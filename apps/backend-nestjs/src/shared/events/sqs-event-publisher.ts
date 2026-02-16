import {Injectable, Logger} from '@nestjs/common';
import {SQSClient, SendMessageCommand} from '@aws-sdk/client-sqs';
import {IEventPublisher, DomainEvent} from './event-publisher.interface';

@Injectable()
export class SqsEventPublisher implements IEventPublisher {
    private readonly logger = new Logger(SqsEventPublisher.name);
    private readonly sqsClient: SQSClient;
    private readonly queueUrl: string;

    constructor() {
        this.sqsClient = new SQSClient({
            region: process.env.AWS_REGION || 'us-east-1',
        });
        this.queueUrl = process.env.NOTIFICATION_QUEUE_URL!;

        if (!this.queueUrl) {
            throw new Error('NOTIFICATION_QUEUE_URL environment variable is required');
        }
    }

    async publish(event: DomainEvent): Promise<void> {
        try {
            const command = new SendMessageCommand({
                QueueUrl: this.queueUrl,
                MessageBody: JSON.stringify(event),
                MessageAttributes: {
                    eventType: {
                        DataType: 'String',
                        StringValue: event.eventType,
                    },
                },
            });

            await this.sqsClient.send(command);

            this.logger.log(`Event published: ${event.eventType}`);
        } catch (error) {
            // NO lanzar error - queremos que el registro del usuario continúe
            this.logger.error(`Failed to publish event: ${error.message}`, error.stack);
        }
    }
}