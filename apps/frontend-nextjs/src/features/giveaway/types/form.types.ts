import {z} from "zod";

import {
    completeFormSchema,
    contactInfoSchema,
    interestLevelSchema,
    painAreaSchema,
    whyNotYetSchema
} from "@/features/giveaway/schemas";

export type ContactInfoData = z.infer<typeof contactInfoSchema>;
export type PainAreaData = z.infer<typeof painAreaSchema>;
export type WhyNotYetData = z.infer<typeof whyNotYetSchema>;
export type InterestLevelData = z.infer<typeof interestLevelSchema>;
export type CompleteFormData = z.infer<typeof completeFormSchema>;