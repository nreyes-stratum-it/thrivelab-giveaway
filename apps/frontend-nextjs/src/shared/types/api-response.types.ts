
export interface ApiSuccessResponse<T> {
    data: T
    message?: string
}

export interface ApiErrorResponse {
    message: string
    errors?: Record<string, string[]>
}

export interface GiveawaySubmitResponse {
    id: string
    email: string
    createdAt: string
    message: string
}