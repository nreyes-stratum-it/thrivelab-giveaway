"use client"

import React from 'react'
import {CheckboxGroup, Checkbox} from "@heroui/react"
import {useFormContext, Controller} from "react-hook-form"
import {FieldError, Merge} from "react-hook-form"
import {inputClasses} from "@/features/giveaway/constants";

interface FormCheckboxGroupProps<T extends string> {
    name: string
    options: readonly T[]
    label?: string
    error?: FieldError | Merge<FieldError, (FieldError | undefined)[]> | undefined
}

export function FormCheckboxGroup<T extends string>({
                                                        name,
                                                        options,
                                                        label,
                                                        error,
                                                    }: FormCheckboxGroupProps<T>) {
    const {control} = useFormContext()

    const errorMessage = error?.message || (error as any)?.root?.message

    return (

        <Controller
            name={name}
            control={control}
            render={({field}) => (
                <CheckboxGroup
                    value={field.value || []}
                    onValueChange={field.onChange}
                    isInvalid={!!error}
                    errorMessage={errorMessage}
                    classNames={{
                        wrapper: "gap-4"
                    }}
                >
                    {options.map((option) => (
                        <div
                            key={option}
                            className={`${inputClasses.inputWrapper} px-5 py-4`}
                        >
                            <div className="flex justify-between items-center">
                                    <span className="text-olive-900 font-semibold">
                                        {option}
                                    </span>
                                <Checkbox value={option}/>
                            </div>
                        </div>
                    ))}
                </CheckboxGroup>
            )}
        />

    )
}