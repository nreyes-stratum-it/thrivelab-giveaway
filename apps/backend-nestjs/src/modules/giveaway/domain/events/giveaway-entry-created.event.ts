import {DomainEvent} from '../../../../shared/events/event-publisher.interface';

export class GiveawayEntryCreatedEvent extends DomainEvent {
    readonly eventType = 'GiveawayEntryCreated';

    constructor(
        public readonly entryId: string,
        public readonly firstName: string,
        public readonly lastName: string,
        public readonly email: string,
        public readonly phoneNumber: string,
        public readonly instagramHandle?: string,
        public readonly painArea?: string,
        public readonly painAreaOther?: string,
        public readonly reasons?: string[],
        public readonly interestLevel?: string,
    ) {
        super();
    }
}