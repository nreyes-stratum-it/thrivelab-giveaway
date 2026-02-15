import {GiveawayEntry} from '../entities/giveaway-entry.entity'

export interface IGiveawayRepository {
    create(entry: Omit<GiveawayEntry, 'id' | 'createdAt' | 'updatedAt'>): Promise<GiveawayEntry>

    findByEmail(email: string): Promise<GiveawayEntry | null>

}

export const GIVEAWAY_REPOSITORY = Symbol('GIVEAWAY_REPOSITORY')