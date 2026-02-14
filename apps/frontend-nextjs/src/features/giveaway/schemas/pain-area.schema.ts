import {z} from 'zod';
import {PAIN_AREAS} from '@/features/giveaway/constants';

export const painAreaSchema = z.object({
    painArea: z.enum(PAIN_AREAS, {
        error: "Please select a pain area"
    }),
    painAreaOther: z.string().optional(),
})
