import {Injectable, Inject} from '@nestjs/common'
import {IGiveawayService} from '../../domain/services/giveaway.service.interface'
import {IGiveawayRepository, GIVEAWAY_REPOSITORY} from '../../domain/repositories/giveaway.repository.interface'
import {GiveawayEntry} from '../../domain/entities/giveaway-entry.entity'
import {CreateGiveawayEntryDto} from '../dto/create-giveaway-entry.dto'
import {ConflictException} from "../../../../shared/exceptions/conflict.exception";
import {ValidationException} from "../../../../shared/exceptions/validation.exception";
import {GiveawayEntryCreatedEvent} from "../../domain/events/giveaway-entry-created.event";
import {EVENT_PUBLISHER, IEventPublisher} from "../../../../shared/events/event-publisher.interface";

@Injectable()
export class GiveawayService implements IGiveawayService {
    constructor(
        @Inject(GIVEAWAY_REPOSITORY)
        private readonly repository: IGiveawayRepository, @Inject(EVENT_PUBLISHER)
        private readonly eventPublisher: IEventPublisher,
    ) {
    }

    async submitEntry(dto: CreateGiveawayEntryDto): Promise<GiveawayEntry> {
        const existingEntry = await this.repository.findByEmail(dto.email)

        if (existingEntry) {
            throw new ConflictException('You have already entered this giveaway')
        }

        const validationErrors: Record<string, string[]> = {}

        if (dto.painArea === 'Other' && !dto.painAreaOther?.trim()) {
            validationErrors.painAreaOther = ['Please specify the pain area when selecting "Other"']
        }

        if (dto.reasons.length === 0) {
            validationErrors.reasons = ['At least one reason must be selected']
        }

        if (Object.keys(validationErrors).length > 0) {
            throw new ValidationException('Validation failed', validationErrors)
        }

        const entry = await this.repository.create({
            firstName: dto.firstName,
            lastName: dto.lastName,
            email: dto.email,
            phoneNumber: dto.phoneNumber,
            instagramHandle: dto.instagramHandle,
            painArea: dto.painArea,
            painAreaOther: dto.painAreaOther,
            reasons: dto.reasons,
            interestLevel: dto.interestLevel,
        })

        this.eventPublisher.publish(
            new GiveawayEntryCreatedEvent(
                entry.id,
                entry.firstName,
                entry.lastName,
                entry.email,
                entry.phoneNumber,
                entry.instagramHandle,
                entry.painArea,
                entry.painAreaOther,
                entry.reasons,
                entry.interestLevel,
            )
        ).catch(error => {
            // Log error but don't throw - notifications are non-critical
            console.error('Failed to publish GiveawayEntryCreatedEvent:', error);
        });

        return entry
    }

    async checkEmailExists(email: string): Promise<boolean> {
        const entry = await this.repository.findByEmail(email)
        return !!entry
    }
}