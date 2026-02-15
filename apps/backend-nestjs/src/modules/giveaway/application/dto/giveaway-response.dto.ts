export class GiveawayResponseDto {
    id: string
    email: string
    createdAt: Date
    message: string

    constructor(partial: Partial<GiveawayResponseDto>) {
        Object.assign(this, partial)
    }
}