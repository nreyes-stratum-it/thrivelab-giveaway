import {z} from 'zod';

export const contactInfoSchema = z.object({
    firstName: z
        .string()
        .min(2, 'First name is required')
        .max(50, 'First name is too long'),

    lastName: z
        .string()
        .min(2, 'Last name is required')
        .max(50, 'Last name is too long'),

    instagramHandle: z
        .string()
        .optional()
        .transform(val => val?.trim() || undefined),

    email: z.email('Invalid email address').min(1, 'Email is required'),

    phoneNumber: z
        .string()
        .min(1, 'Phone number is required')
        .refine(
            (phone) => {
                const cleaned = phone.replace(/\D/g, '')
                return cleaned.length === 10
            },
            {message: 'Phone number must be 10 digits'}
        ),
});

