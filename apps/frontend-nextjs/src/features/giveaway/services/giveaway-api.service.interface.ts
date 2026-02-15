import {CompleteFormData} from "@/features/giveaway/types";
import {GiveawaySubmitResponse} from "@/shared/types";

export interface IGiveawayApiService {
    submitEntry(data: CompleteFormData): Promise<GiveawaySubmitResponse>
}