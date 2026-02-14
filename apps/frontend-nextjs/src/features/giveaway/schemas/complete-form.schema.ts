import {z} from 'zod';
import {contactInfoSchema} from './contact-info.schema';
import {painAreaSchema} from './pain-area.schema';
import {whyNotYetSchema} from './why-not-yet.schema';
import {interestLevelSchema} from './interest-level.schema';

export const completeFormSchema = z
    .object({
        ...contactInfoSchema.shape,
        ...painAreaSchema.shape,
        ...whyNotYetSchema.shape,
        ...interestLevelSchema.shape,
    }).refine(
        (data) => {

            if (data.painArea === 'Other') {
                return data.painAreaOther && data.painAreaOther.trim().length > 0
            }
            return true
        },
        {
            message: 'Please specify the area',
            path: ['painAreaOther'],
        }
    )
