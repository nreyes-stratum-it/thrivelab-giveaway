"use client"

import {FormProvider} from 'react-hook-form'
import ContactInfoStep from './steps/ContactInfoStep'
import PainAreaStep from './steps/PainAreaStep'
import WhyNotYetStep from './steps/WhyNotYetStep'
import InterestLevelStep from './steps/InterestLevelStep'
import {useGiveawayForm} from "@/features/giveaway/hooks";
import {StepIndicator} from "@/features/giveaway/components/form/ui/StepIndicator";
import {NavigationButtons} from "@/features/giveaway/components/form/ui/NavigationButtons";

const STEP_COMPONENTS = [
    ContactInfoStep,
    PainAreaStep,
    WhyNotYetStep,
    InterestLevelStep,
]

const GiveawayForm = () => {
    const {
        methods,
        currentStep,
        totalSteps,
        isFirstStep,
        isLastStep,
        currentStepTitle,
        progress,
        goToNext,
        goToPrev,
        onSubmit,
        isSubmitting,
    } = useGiveawayForm()

    if (!methods) {
        return <div className="p-8 text-center">Loading...</div>
    }


    const CurrentStepComponent = STEP_COMPONENTS[currentStep]

    return (

        <>
            <div className="text-center mb-8 space-y-3">
                <h1 className="font-serif text-2xl  text-olive-900">
                    thrivelab
                </h1>
                <p className="font-semibold text-sm text-olive-800">
                    Exclusive Giveaway
                </p>
                <h2 className="font-thin font-serif text-3xl md:text-4xl leading-tight text-olive-700">
                    Win a $10,000 in-home stem cell treatment
                </h2>
            </div>

            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
                    <StepIndicator
                        currentStep={currentStep}
                        totalSteps={totalSteps}
                        stepTitle={currentStepTitle}
                        progress={progress}
                    />

                    <div className="animate-fadeIn">
                        <CurrentStepComponent/>
                    </div>

                    <NavigationButtons
                        onBack={goToPrev}
                        onContinue={goToNext}
                        isFirstStep={isFirstStep}
                        isLastStep={isLastStep}
                        isSubmitting={isSubmitting}
                        currentStep={currentStep}
                    />
                </form>
            </FormProvider>

        </>

    )
}

export default GiveawayForm