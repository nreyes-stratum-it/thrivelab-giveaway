import {z} from 'zod';
import {INTEREST_LEVELS} from "@/features/giveaway/constants";

export const interestLevelSchema = z.object({
    interestLevel: z.enum(INTEREST_LEVELS, {
        error: 'Please select your level of interest in treatment options',
    }),
})
