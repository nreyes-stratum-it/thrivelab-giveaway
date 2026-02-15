import {AxiosHttpClient} from "@/shared/infrastructure/http";
import {IGiveawayApiService} from "@/features/giveaway/services/giveaway-api.service.interface";
import {GiveawayApiService} from "@/features/giveaway/services/giveaway-api.service";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

export function createGiveawayApiService(): IGiveawayApiService {
    const httpClient = new AxiosHttpClient(API_BASE_URL)
    return new GiveawayApiService(httpClient)
}

export const giveawayApiService = createGiveawayApiService()