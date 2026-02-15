

import {
    IsString,
    IsEmail,
    IsArray,
    IsOptional,
    IsNotEmpty,
    ArrayMinSize,
    Matches,
    MinLength
} from 'class-validator'

export class CreateGiveawayEntryDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    firstName: string

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    lastName: string

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    @Matches(/^\(\d{3}\) \d{3}-\d{4}$/, {
        message: 'Phone number must be in format (123) 456-7890'
    })
    phoneNumber: string

    @IsString()
    @IsOptional()
    instagramHandle?: string

    @IsString()
    @IsNotEmpty()
    painArea: string

    @IsString()
    @IsOptional()
    painAreaOther?: string

    @IsArray()
    @ArrayMinSize(1)
    @IsString({each: true})
    reasons: string[]

    @IsString()
    @IsNotEmpty()
    interestLevel: string
}