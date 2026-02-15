import {Injectable} from '@nestjs/common'
import {IGiveawayRepository} from '../../domain/repositories/giveaway.repository.interface'
import {GiveawayEntry} from '../../domain/entities/giveaway-entry.entity'
import {PrismaService} from "../database/prisma.service";

@Injectable()
export class PrismaGiveawayRepository implements IGiveawayRepository {
    constructor(private readonly prisma: PrismaService) {
    }

    async create(data: Omit<GiveawayEntry, 'id' | 'createdAt' | 'updatedAt'>): Promise<GiveawayEntry> {
        const entry = await this.prisma.giveawayEntry.create({
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phoneNumber: data.phoneNumber,
                instagramHandle: data.instagramHandle ?? null,
                painArea: data.painArea,
                painAreaOther: data.painAreaOther ?? null,
                reasons: data.reasons,
                interestLevel: data.interestLevel,
            },
        })

        return this.toDomain(entry)
    }

    async findByEmail(email: string): Promise<GiveawayEntry | null> {
        const entry = await this.prisma.giveawayEntry.findUnique({
            where: {email},
        })

        return entry ? this.toDomain(entry) : null
    }

    private toDomain(entry: any): GiveawayEntry {
        return new GiveawayEntry({
            ...entry,
            instagramHandle: entry.instagramHandle ?? undefined,
            painAreaOther: entry.painAreaOther ?? undefined,
        })
    }
}