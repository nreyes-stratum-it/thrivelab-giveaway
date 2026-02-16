import {Injectable, Logger} from '@nestjs/common';
import {IEventPublisher, DomainEvent} from './event-publisher.interface';

@Injectable()
export class MockEventPublisher implements IEventPublisher {
    private readonly logger = new Logger(MockEventPublisher.name);

    async publish(event: DomainEvent): Promise<void> {
        this.logger.log(`📧 Mock: Event published: ${event.eventType}`);
        this.logger.debug(`Event details: ${JSON.stringify(event, null, 2)}`);


        if (process.env.NODE_ENV === 'development') {
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
            console.log('📧 EMAIL NOTIFICATION (MOCKED)');
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
            console.log(JSON.stringify(event, null, 2));
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        }

        await new Promise(resolve => setTimeout(resolve, 100));
    }
}
