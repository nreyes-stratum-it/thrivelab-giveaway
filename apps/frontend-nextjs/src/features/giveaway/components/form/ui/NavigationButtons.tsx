"use client"

import {Button} from "@heroui/react"
import {FaArrowRight, FaArrowLeft} from "react-icons/fa"

interface NavigationButtonsProps {
    onBack: () => void
    onContinue: () => void
    isFirstStep: boolean
    isLastStep: boolean
    isSubmitting?: boolean
    currentStep: number
}

export function NavigationButtons({
                                      onBack,
                                      onContinue,
                                      isFirstStep,
                                      isLastStep,
                                      isSubmitting = false,
                                      currentStep
                                  }: NavigationButtonsProps) {
    return (
        <div className="space-y-4 sm:space-y-6 mt-6 sm:mt-8">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                {!isFirstStep && (
                    <Button
                        type="button"
                        variant="bordered"
                        onPress={onBack}
                        size="lg"
                        className="w-full sm:flex-1 h-12 sm:h-14 border-olive-200 text-olive-700 hover:bg-olive-50 rounded-lg font-medium"
                        startContent={<FaArrowLeft className="w-3 h-3 sm:w-4 sm:h-4"/>}
                    >
                        Back
                    </Button>
                )}

                {isLastStep ? (
                    <Button
                        key={`submit-${currentStep}`}
                        type="submit"
                        size="lg"
                        className="w-full sm:flex-1 h-12 sm:h-14 bg-olive-700 hover:bg-olive-800 text-white rounded-lg font-semibold"
                        isLoading={isSubmitting}
                        endContent={!isSubmitting && <FaArrowRight className="w-3 h-3 sm:w-4 sm:h-4"/>}
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </Button>
                ) : (
                    <Button
                        key={`continue-${currentStep}`}
                        type="button"
                        size="lg"
                        className="w-full sm:flex-1 h-12 sm:h-14 bg-olive-700 hover:bg-olive-800 text-white rounded-lg font-semibold"
                        onPress={onContinue}
                        endContent={<FaArrowRight className="w-3 h-3 sm:w-4 sm:h-4"/>}
                    >
                        Continue
                    </Button>
                )}
            </div>

            <p className="text-center mt-6 text-sm sm:text-sm text-olive-400 leading-relaxed px-2">
                This is an in-home treatment. If you are not located in one of our service areas, travel will be
                required.
            </p>
        </div>
    )
}