import {create} from 'zustand'
import {persist} from 'zustand/middleware'
import {CompleteFormData} from "@/features/giveaway/types"
import {INITIAL_FORM_DATA} from "@/features/giveaway/constants"

interface FormState {
    formData: CompleteFormData
    currentStep: number
    _hasHydrated: boolean
    updateFormData: (data: Partial<CompleteFormData>) => void
    setCurrentStep: (step: number) => void
    nextStep: () => void
    prevStep: () => void
    resetForm: () => void
    setHasHydrated: (state: boolean) => void
}

export const useFormStore = create<FormState>()(
    persist(
        (set) => ({
            formData: INITIAL_FORM_DATA,
            currentStep: 0,
            _hasHydrated: false,

            updateFormData: (data) =>
                set((state) => ({
                    formData: {...state.formData, ...data},
                })),

            setCurrentStep: (step) => set({currentStep: step}),

            nextStep: () =>
                set((state) => ({
                    currentStep: Math.min(state.currentStep + 1, 3),
                })),

            prevStep: () =>
                set((state) => ({
                    currentStep: Math.max(state.currentStep - 1, 0),
                })),

            resetForm: () =>
                set({
                    formData: INITIAL_FORM_DATA,
                    currentStep: 0,
                }),

            setHasHydrated: (state) =>
                set({_hasHydrated: state}),
        }),
        {
            name: 'thrivelab-giveaway-storage',
            partialize: (state) => ({
                formData: state.formData,
                currentStep: state.currentStep,
            }),
            onRehydrateStorage: () => (state) => {
                state?.setHasHydrated(true)
            },
        }
    )
)