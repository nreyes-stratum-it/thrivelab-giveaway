"use client"

import React from 'react'
import {Input} from "@heroui/react"
import {Controller, Control, FieldError} from 'react-hook-form'

interface PhoneInputProps {
    name: string
    control: Control<any>
    label?: string
    placeholder?: string
    error?: FieldError
    isRequired?: boolean
    classNames?: any
}

export function PhoneInput({
                               name,
                               control,
                               label = "Phone Number",
                               placeholder = "(123) 456-7890",
                               error,
                               isRequired = false,
                               classNames,
                           }: PhoneInputProps) {
    const formatPhoneNumber = (value: string): string => {
        const cleaned = value.replace(/\D/g, '')

        const limited = cleaned.slice(0, 10)

        if (limited.length === 0) return ''
        if (limited.length <= 3) return `(${limited}`
        if (limited.length <= 6) {
            return `(${limited.slice(0, 3)}) ${limited.slice(3)}`
        }
        return `(${limited.slice(0, 3)}) ${limited.slice(3, 6)}-${limited.slice(6)}`
    }

    return (
        <Controller
            name={name}
            control={control}
            render={({field}) => {
                const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                    const input = e.target.value
                    const formatted = formatPhoneNumber(input)
                    field.onChange(formatted)
                }

                const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === 'Backspace') {
                        const input = e.currentTarget
                        const value = field.value || ''
                        const cursorPos = input.selectionStart || 0

                        if (cursorPos > 0 && /[^\d]/.test(value[cursorPos - 1])) {
                            e.preventDefault()

                            const beforeCursor = value.slice(0, cursorPos - 2)
                            const afterCursor = value.slice(cursorPos)
                            const newValue = beforeCursor + afterCursor
                            const cleaned = newValue.replace(/\D/g, '')
                            const formatted = formatPhoneNumber(cleaned)

                            field.onChange(formatted)

                            setTimeout(() => {
                                const newCursorPos = formatted.length < cursorPos - 1
                                    ? formatted.length
                                    : cursorPos - 2
                                input.setSelectionRange(newCursorPos, newCursorPos)
                            }, 0)
                        }
                    }
                }

                return (
                    <Input
                        value={field.value || ''}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        onBlur={field.onBlur}
                        classNames={classNames}
                        className="rounded-xs"
                        variant="bordered"
                        label={label}
                        placeholder={placeholder}
                        type="tel"
                        isRequired={isRequired}
                        isInvalid={!!error}
                        errorMessage={error?.message}
                    />
                )
            }}
        />
    )
}