"use client"

import React, {ReactNode} from 'react'
import {RadioGroup, Radio} from "@heroui/react"
import {useFormContext, Controller} from "react-hook-form"
import {FieldError} from "react-hook-form"
import {inputClasses} from "@/features/giveaway/constants";


interface FormRadioGroupProps<T extends string> {
    name: string
    options: readonly T[]
    error?: FieldError
    onValueChange?: (value: T) => void
    renderCustomContent?: (option: T, isSelected: boolean) => ReactNode
    getOptionLabel?: (option: T) => string
}

export function FormRadioGroup<T extends string>({
                                                     name,
                                                     options,
                                                     error,
                                                     onValueChange,
                                                     renderCustomContent,
                                                     getOptionLabel,
                                                 }: FormRadioGroupProps<T>) {
    const {control, watch} = useFormContext()

    const selectedValue = watch(name)

    return (

        <Controller
            name={name}
            control={control}
            render={({field}) => (
                <RadioGroup
                    value={field.value || ''}
                    onValueChange={(value) => {
                        field.onChange(value)
                        onValueChange?.(value as T)
                    }}
                    isInvalid={!!error}
                    errorMessage={error?.message}
                    classNames={{
                        wrapper: "gap-4"
                    }}
                >
                    {options.map((option) => {
                        const isSelected = selectedValue === option
                        const displayLabel = getOptionLabel?.(option) || option

                        return (
                            <div
                                key={option}
                                className={`${inputClasses.inputWrapper} px-5 py-4`}
                            >
                                <div className="flex justify-between items-center">
                                        <span className="text-olive-900 font-semibold">
                                            {displayLabel}
                                        </span>
                                    <Radio value={option}/>
                                </div>

                                {renderCustomContent && isSelected && (
                                    <div className="mt-4">
                                        {renderCustomContent(option, isSelected)}
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </RadioGroup>
            )}
        />
    )
}