export class GiveawayEntry {
    id: string
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    instagramHandle?: string
    painArea: string
    painAreaOther?: string
    reasons: string[]
    interestLevel: string
    createdAt: Date
    updatedAt: Date

    constructor(partial: Partial<GiveawayEntry>) {
        Object.assign(this, partial)
    }

}