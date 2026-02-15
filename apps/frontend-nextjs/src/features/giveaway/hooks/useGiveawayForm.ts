"use client"

import {useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {CompleteFormData} from "@/features/giveaway/types"
import {useFormStore} from "@/features/giveaway/store"
import {completeFormSchema} from "@/features/giveaway/schemas"
import {giveawayApiService} from "@/features/giveaway/services";

interface StepConfig {
    title: string
    fields: (keyof CompleteFormData)[]
}

export const FORM_STEPS: StepConfig[] = [
    {title: 'Contact Information', fields: ['firstName', 'lastName', 'email', 'phoneNumber', 'instagramHandle']},
    {title: 'Pain Area', fields: ['painArea', 'painAreaOther']},
    {title: 'Treatment History', fields: ['reasons']},
    {title: 'Interest Level', fields: ['interestLevel']},
]

export function useGiveawayForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)

    const {
        formData,
        currentStep,
        _hasHydrated,
        updateFormData,
        nextStep,
        prevStep,
        resetForm
    } = useFormStore()

    const methods = useForm({
        resolver: zodResolver(completeFormSchema),
        mode: 'onChange',
        values: _hasHydrated ? formData : undefined,
    })

    const {trigger, watch, getValues, setError} = methods

    useEffect(() => {
        if (!_hasHydrated) return

        const subscription = watch((values) => {
            updateFormData(values as CompleteFormData)
        })

        return () => subscription.unsubscribe()
    }, [watch, updateFormData, _hasHydrated])

    const goToNext = async () => {
        const currentFields = FORM_STEPS[currentStep].fields
        const formValues = getValues()

        const isValid = await trigger(currentFields)

        if (currentStep === 1) {
            if (formValues.painArea === 'Other') {
                if (!formValues.painAreaOther || formValues.painAreaOther.trim() === '') {
                    setError('painAreaOther', {
                        type: 'manual',
                        message: 'Please specify the area'
                    })
                    return
                }
            }
        }
        if (isValid) {
            nextStep()
            window.scrollTo({top: 0, behavior: 'smooth'})
        }
    }

    const goToPrev = () => {
        prevStep()
        window.scrollTo({top: 0, behavior: 'smooth'})
    }

    const onSubmit = async (data: CompleteFormData) => {

        setIsSubmitting(true)

        try {
            const response = await giveawayApiService.submitEntry(data)
            console.log(response)

            resetForm()
            alert('Form submitted successfully!')
        } catch (error) {
            console.error('Submission error:', error)
            alert('Error submitting form. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return {
        methods,
        currentStep,
        totalSteps: FORM_STEPS.length,
        isFirstStep: currentStep === 0,
        isLastStep: currentStep === FORM_STEPS.length - 1,
        currentStepTitle: FORM_STEPS[currentStep].title,
        progress: ((currentStep + 1) / FORM_STEPS.length) * 100,
        goToNext,
        goToPrev,
        onSubmit,
        isSubmitting,
    }
}