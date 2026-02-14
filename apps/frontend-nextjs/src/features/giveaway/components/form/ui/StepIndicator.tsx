"use client"

import {Progress} from "@heroui/react"

interface StepIndicatorProps {
    currentStep: number
    totalSteps: number
    stepTitle: string
    progress: number
}

export function StepIndicator({
                                  currentStep,
                                  totalSteps,
                                  stepTitle,
                                  progress
                              }: StepIndicatorProps) {
    return (
        <div className="mb-8 space-y-2">
            <Progress
                value={progress}
                className="h-2"
                classNames={{
                    indicator: "bg-olive-600"
                }}
            />
            <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">
                    Step {currentStep + 1} of {totalSteps}
                </span>

            </div>
        </div>
    )
}