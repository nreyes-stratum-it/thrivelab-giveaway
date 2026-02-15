import {GiveawayEntry} from '../entities/giveaway-entry.entity'
import {CreateGiveawayEntryDto} from "../../application/dto/create-giveaway-entry.dto";

export const GIVEAWAY_SERVICE = Symbol('GIVEAWAY_SERVICE')

export interface IGiveawayService {
    submitEntry(dto: CreateGiveawayEntryDto): Promise<GiveawayEntry>

    checkEmailExists(email: string): Promise<boolean>
}
