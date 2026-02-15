import {Controller, Post, Body, HttpCode, HttpStatus, Inject} from '@nestjs/common'
import type {IGiveawayService} from '../../domain/services/giveaway.service.interface'
import {GIVEAWAY_SERVICE} from '../../domain/services/giveaway.service.interface'
import {CreateGiveawayEntryDto} from '../../application/dto/create-giveaway-entry.dto'
import {GiveawayResponseDto} from '../../application/dto/giveaway-response.dto'

@Controller('giveaway')
export class GiveawayController {
    constructor(
        @Inject(GIVEAWAY_SERVICE)
        private readonly giveawayService: IGiveawayService
    ) {
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async submitEntry(@Body() dto: CreateGiveawayEntryDto): Promise<GiveawayResponseDto> {
        const entry = await this.giveawayService.submitEntry(dto)

        return new GiveawayResponseDto({
            id: entry.id,
            email: entry.email,
            createdAt: entry.createdAt,
            message: 'Successfully entered the giveaway!',
        })
    }
}