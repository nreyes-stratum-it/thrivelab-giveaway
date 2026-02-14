import {z} from 'zod'
import {WHY_NOT_YET_REASONS} from '@/features/giveaway/constants'

export const whyNotYetSchema = z.object({
    reasons: z
        .array(z.enum(WHY_NOT_YET_REASONS))
        .min(1, 'Please select at least one reason')
})