import {IGiveawayApiService} from "@/features/giveaway/services/giveaway-api.service.interface";
import {CompleteFormData} from "@/features/giveaway/types";
import {GiveawaySubmitResponse} from "@/shared/types";
import {IHttpClient} from "@/shared/infrastructure/http";


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
                throw new Error('You have already entered this giveaway')
            }
            if (error.status === 400) {
                throw new Error(error.message || 'Invalid form data')
            }
            throw new Error('Failed to submit entry. Please try again.')
        }
    }

}