"use client"

import React from 'react'
import {useFormContext, Controller} from "react-hook-form"
import {CompleteFormData} from "@/features/giveaway/types"
import {inputClasses, PAIN_AREAS} from "@/features/giveaway/constants"
import {FormRadioGroup} from "@/features/giveaway/components/form/inputs/FormRadioGroup";
import {Textarea} from "@heroui/input";

const PainAreaStep = () => {
    const {control, formState: {errors}, setValue} = useFormContext<CompleteFormData>()


    return (
        <div className="flex flex-col gap-6">
            <div>
                <h3 className="text-md lg:text-lg font-semibold mb-2 text-olive-900">
                    What area of your body are you experiencing pain or discomfort in?
                </h3>

                <FormRadioGroup
                    name="painArea"
                    options={PAIN_AREAS}
                    error={errors.painArea}
                    onValueChange={(value) => {
                        if (value !== 'Other') {
                            setValue('painAreaOther', '', {shouldValidate: true})
                        }
                    }}
                    renderCustomContent={(option, isSelected) => {
                        if (option !== 'Other') return null

                        return (
                            <Controller
                                name="painAreaOther"
                                control={control}
                                render={({field}) => (
                                    <Textarea
                                        value={field.value || ''}
                                        onChange={field.onChange}
                                        onBlur={field.onBlur}
                                        classNames={{
                                            base: inputClasses.base,
                                            input: inputClasses.input,
                                            inputWrapper: inputClasses.inputWrapper,
                                            label: "!text-olive-400 !font-normal",
                                        }}
                                        placeholder="Type here"
                                        label="Please specify"
                                        labelPlacement="outside"
                                        variant="bordered"
                                        isRequired
                                        isInvalid={!!errors.painAreaOther}
                                        errorMessage={errors.painAreaOther?.message}
                                    />
                                )}
                            />
                        )
                    }}
                />
            </div>


        </div>
    )
}

export default PainAreaStep