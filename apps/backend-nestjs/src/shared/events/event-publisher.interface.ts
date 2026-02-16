export interface IEventPublisher {
    publish(event: DomainEvent): Promise<void>;
}

export abstract class DomainEvent {
    abstract readonly eventType: string;
    readonly occurredAt: Date = new Date();
}

export const EVENT_PUBLISHER = Symbol('EVENT_PUBLISHER');
