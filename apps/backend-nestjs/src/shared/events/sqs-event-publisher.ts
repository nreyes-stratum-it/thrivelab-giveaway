import {Injectable, Logger} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {SQSClient, SendMessageCommand} from '@aws-sdk/client-sqs';
import {IEventPublisher, DomainEvent} from './event-publisher.interface';

@Injectable()
export class SqsEventPublisher implements IEventPublisher {
    private readonly logger = new Logger(SqsEventPublisher.name);
    private readonly sqsClient: SQSClient;
    private readonly queueUrl: string | undefined;

    constructor(private readonly configService: ConfigService) {
        this.queueUrl = this.configService.get<string>('NOTIFICATION_QUEUE_URL');
        const region = this.configService.get<string>('AWS_REGION', 'us-east-1');

        console.log('🔧 SqsEventPublisher initialization:', {
            queueUrl: this.queueUrl,
            region: region,
            hasQueueUrl: !!this.queueUrl,
        });

        if (this.queueUrl) {
            this.sqsClient = new SQSClient({region});
            this.logger.log(`SQS Publisher initialized with queue: ${this.queueUrl}`);
        } else {
            this.logger.warn(' NOTIFICATION_QUEUE_URL not configured - events will not be published');
        }
    }

    async publish(event: DomainEvent): Promise<void> {
        if (!this.queueUrl) {
            this.logger.warn(` Skipping event publish (no queue configured): ${event.eventType}`);
            return;
        }

        try {
            this.logger.log(`Publishing event to SQS: ${event.eventType}`);
            console.log('Event details:', {
                eventType: event.eventType,
                queueUrl: this.queueUrl,
                eventData: JSON.stringify(event).substring(0, 200) + '...',
            });

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

            const result = await this.sqsClient.send(command);


            this.logger.log(`Event published successfully: ${event.eventType} (MessageId: ${result.MessageId})`);
            console.log('SQS send result:', {
                MessageId: result.MessageId,
                MD5OfMessageBody: result.MD5OfMessageBody,
            });
        } catch (error) {
            this.logger.error(` Failed to publish event: ${error instanceof Error ? error.message : String(error)}`);
            console.error('SQS publish error details:', {
                errorName: error instanceof Error ? error.name : 'Unknown',
                errorMessage: error instanceof Error ? error.message : String(error),
                errorStack: error instanceof Error ? error.stack : undefined,
                queueUrl: this.queueUrl,
                eventType: event.eventType,
            });
        }
    }
}