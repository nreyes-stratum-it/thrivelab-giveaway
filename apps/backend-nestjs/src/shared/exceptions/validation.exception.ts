import {HttpException, HttpStatus} from '@nestjs/common'

export class ValidationException extends HttpException {
    constructor(message: string = 'Validation failed', errors?: Record<string, string[]>) {
        super(
            {
                statusCode: HttpStatus.BAD_REQUEST,
                message,
                error: 'Bad Request',
                errors,
            },
            HttpStatus.BAD_REQUEST
        )
    }
}