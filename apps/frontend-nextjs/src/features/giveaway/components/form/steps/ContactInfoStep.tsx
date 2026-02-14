"use client"

import React from 'react'
import {Input} from "@heroui/react"
import {useFormContext, Controller} from "react-hook-form"
import {CompleteFormData} from "@/features/giveaway/types"
import {inputClasses} from "@/features/giveaway/constants";
import {PhoneInput} from "@/features/giveaway/components/form/inputs/PhoneInput";


const ContactInfoStep = () => {
    const {control, formState: {errors}} = useFormContext<CompleteFormData>()


    return (
        <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                <Controller
                    name="firstName"
                    control={control}
                    render={({field}) => (
                        <Input
                            classNames={inputClasses}
                            variant="bordered"
                            value={field.value}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            placeholder="First Name"
                            label="First Name"
                            type="text"
                            isRequired
                            isInvalid={!!errors.firstName}
                            errorMessage={errors.firstName?.message}
                        />
                    )}
                />

                <Controller
                    name="lastName"
                    control={control}
                    render={({field}) => (
                        <Input
                            classNames={inputClasses}
                            variant="bordered"
                            value={field.value}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            placeholder="Last Name"
                            label="Last Name"
                            type="text"
                            isRequired
                            isInvalid={!!errors.lastName}
                            errorMessage={errors.lastName?.message}
                        />
                    )}
                />
            </div>

            <Controller
                name="instagramHandle"
                control={control}
                render={({field}) => (
                    <Input
                        classNames={inputClasses}
                        variant="bordered"
                        value={field.value || ''}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        placeholder="e.g. @thrivelab"
                        label="Your Instagram Handle"
                        type="text"
                        isInvalid={!!errors.instagramHandle}
                        errorMessage={errors.instagramHandle?.message}
                    />
                )}
            />

            <Controller
                name="email"
                control={control}
                render={({field}) => (
                    <Input
                        classNames={inputClasses}
                        variant="bordered"
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        placeholder="Your Email address"
                        label="Email"
                        type="email"
                        isRequired
                        isInvalid={!!errors.email}
                        errorMessage={errors.email?.message}
                    />
                )}
            />

            <PhoneInput
                name="phoneNumber"
                control={control}
                label="Phone Number"
                placeholder="(123) 456-7890"
                isRequired
                error={errors.phoneNumber}
                classNames={inputClasses}
            />
        </div>
    )
}

export default ContactInfoStep