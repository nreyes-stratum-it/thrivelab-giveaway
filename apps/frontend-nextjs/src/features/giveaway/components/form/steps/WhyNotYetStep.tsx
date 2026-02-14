"use client"

import React from 'react'
import {useFormContext} from "react-hook-form"
import {CompleteFormData} from "@/features/giveaway/types"
import {WHY_NOT_YET_REASONS} from "@/features/giveaway/constants"
import {FormCheckboxGroup} from "@/features/giveaway/components/form/inputs/FormCheckboxGroup";

const WhyNotYetStep = () => {
    const {formState: {errors}, control} = useFormContext<CompleteFormData>()


    return (
        <div className="flex flex-col gap-6">
            <div>
                <h3 className="text-md lg:text-lg font-semibold mb-2 text-olive-900">
                    Why haven't you already received a stem cell treatment?
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                    Select all that apply
                </p>

                <FormCheckboxGroup
                    name="reasons"
                    options={WHY_NOT_YET_REASONS}
                    error={errors.reasons}
                />
            </div>
        </div>
    )
}

export default WhyNotYetStep