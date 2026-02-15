import {Injectable, Inject, ConflictException, BadRequestException} from '@nestjs/common'
import {IGiveawayService} from '../../domain/services/giveaway.service.interface'
import type {IGiveawayRepository} from '../../domain/repositories/giveaway.repository.interface'
import {GIVEAWAY_REPOSITORY} from '../../domain/repositories/giveaway.repository.interface'
import {GiveawayEntry} from '../../domain/entities/giveaway-entry.entity'
import {CreateGiveawayEntryDto} from '../dto/create-giveaway-entry.dto'

@Injectable()
export class GiveawayService implements IGiveawayService {
    constructor(
        @Inject(GIVEAWAY_REPOSITORY)
        private readonly repository: IGiveawayRepository
    ) {
    }

    async submitEntry(dto: CreateGiveawayEntryDto): Promise<GiveawayEntry> {
        const existingEntry = await this.repository.findByEmail(dto.email)

        if (existingEntry) {
            throw new ConflictException('You have already entered this giveaway')
        }

        if (dto.painArea === 'Other' && !dto.painAreaOther?.trim()) {
            throw new BadRequestException('Please specify the pain area')
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

        return entry
    }

    async checkEmailExists(email: string): Promise<boolean> {
        const entry = await this.repository.findByEmail(email)
        return !!entry
    }
}