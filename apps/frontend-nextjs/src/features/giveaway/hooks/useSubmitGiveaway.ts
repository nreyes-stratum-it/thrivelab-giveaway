import {useState} from 'react'
import {GiveawaySubmitResponse} from '@/shared/types/api-response.types'
import {CompleteFormData} from "@/features/giveaway/types"
import {giveawayApiService} from "@/features/giveaway/services"

export type ErrorType = 'conflict' | 'validation' | 'network' | null

interface UseSubmitGiveawayReturn {
    submitEntry: (data: CompleteFormData) => Promise<GiveawaySubmitResponse>
    isSubmitting: boolean
    error: string | null
    errorType: ErrorType
    clearError: () => void
}

export function useSubmitGiveaway(): UseSubmitGiveawayReturn {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [errorType, setErrorType] = useState<ErrorType>(null)

    const submitEntry = async (data: CompleteFormData): Promise<GiveawaySubmitResponse> => {
        setIsSubmitting(true)
        setError(null)
        setErrorType(null)

        try {
            return await giveawayApiService.submitEntry(data)
        } catch (err: any) {

            const errorMessage = err.message || 'Failed to submit entry. Please try again.'
            const type: ErrorType = err.type || 'network'

            setError(errorMessage)
            setErrorType(type)

            throw err
        } finally {
            setIsSubmitting(false)
        }
    }

    const clearError = () => {
        setError(null)
        setErrorType(null)
    }

    return {
        submitEntry,
        isSubmitting,
        error,
        errorType,
        clearError,
    }
}