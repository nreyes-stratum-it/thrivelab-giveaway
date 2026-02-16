import {IHttpClient} from '@/shared/infrastructure/http/http-client.interface'
import {IGiveawayApiService} from './giveaway-api.service.interface'
import {CompleteFormData} from '../types'
import {GiveawaySubmitResponse} from '@/shared/types/api-response.types'

export class GiveawayApiService implements IGiveawayApiService {
    constructor(private readonly httpClient: IHttpClient) {
    }

    async submitEntry(data: CompleteFormData): Promise<GiveawaySubmitResponse> {
        try {
            const response = await this.httpClient.post<GiveawaySubmitResponse>(
                '/giveaway',
                data
            )
            return response.data
        } catch (error: any) {

            if (error.status === 409) {
                throw {
                    type: 'conflict',
                    message: error.message || 'You have already entered this giveaway',
                }
            }

            if (error.status === 400) {
                if (error.errors && typeof error.errors === 'object') {
                    const errorMessages = Object.entries(error.errors)
                        .map(([field, messages]) => {
                            const fieldName = this.formatFieldName(field)
                            const msgArray = Array.isArray(messages) ? messages : [messages]
                            return `${fieldName}: ${msgArray.join(', ')}`
                        })
                        .join('\n')

                    throw {
                        type: 'validation',
                        message: errorMessages,
                    }
                }

                throw {
                    type: 'validation',
                    message: error.message || 'Invalid form data',
                }
            }

            throw {
                type: 'network',
                message: error.message || 'Failed to submit entry. Please try again.',
            }
        }
    }

    private formatFieldName(field: string): string {
        const fieldNames: Record<string, string> = {
            firstName: 'First Name',
            lastName: 'Last Name',
            email: 'Email',
            phoneNumber: 'Phone Number',
            instagramHandle: 'Instagram Handle',
            painArea: 'Pain Area',
            painAreaOther: 'Pain Area Detail',
            reasons: 'Reasons',
            interestLevel: 'Interest Level',
            general: '',
        }

        return fieldNames[field] !== undefined
            ? fieldNames[field]
            : this.capitalizeWords(field)
    }

    private capitalizeWords(str: string): string {
        return str
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, (char) => char.toUpperCase())
            .trim()
    }

}