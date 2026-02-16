import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    BadRequestException,
} from '@nestjs/common'
import {Response} from 'express'

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
    catch(exception: BadRequestException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        const request = ctx.getRequest()
        const status = exception.getStatus()
        const exceptionResponse: any = exception.getResponse()

        const errors = this.formatValidationErrors(exceptionResponse.message)

        response.status(status).json({
            statusCode: status,
            message: 'Validation failed',
            error: 'Bad Request',
            errors,
            timestamp: new Date().toISOString(),
            path: request.url,
        })
    }

    private formatValidationErrors(
        messages: string | string[]
    ): Record<string, string[]> {
        const errors: Record<string, string[]> = {}

        if (typeof messages === 'string') {
            errors.general = [messages]
            return errors
        }

        if (Array.isArray(messages)) {
            messages.forEach((msg: any) => {
                if (typeof msg === 'string') {
                    const match = msg.match(/^(\w+)\s+must/)
                    const field = match ? match[1] : 'general'

                    if (!errors[field]) errors[field] = []
                    errors[field].push(msg)
                } else if (msg.property && msg.constraints) {
                    errors[msg.property] = Object.values(msg.constraints)
                }
            })
        }

        return errors
    }
}