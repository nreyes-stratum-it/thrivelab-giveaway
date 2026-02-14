"use client"

import React from 'react'
import {useFormContext} from "react-hook-form"
import {CompleteFormData} from "@/features/giveaway/types"
import {INTEREST_LEVELS} from "@/features/giveaway/constants"
import {FormRadioGroup} from "@/features/giveaway/components/form/inputs/FormRadioGroup";

const InterestLevelStep = () => {
    const {formState: {errors}} = useFormContext<CompleteFormData>()

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h3 className="text-md lg:text-lg font-semibold mb-2 text-olive-900">
                    If you don't win the giveaway, would you still be interested in learning more or receiving
                    treatment?
                </h3>
                <p className="text-sm text-olive-500 font-normal mb-4">
                    Treatments typically start at $237/month or around $5,000 total
                </p>

                <FormRadioGroup
                    name="interestLevel"
                    options={INTEREST_LEVELS}
                    error={errors.interestLevel}
                />
            </div>
        </div>
    )
}

export default InterestLevelStep