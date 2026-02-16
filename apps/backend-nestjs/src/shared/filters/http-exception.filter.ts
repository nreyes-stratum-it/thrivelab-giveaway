import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
} from '@nestjs/common'
import {Response} from 'express'

interface ErrorResponse {
    statusCode: number
    message: string
    error: string
    errors?: Record<string, string[]>
    timestamp: string
    path: string
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        const request = ctx.getRequest()
        const status = exception.getStatus()
        const exceptionResponse = exception.getResponse()

        const errorResponse: ErrorResponse = {
            statusCode: status,
            message: this.extractMessage(exceptionResponse),
            error: this.extractError(exceptionResponse),
            timestamp: new Date().toISOString(),
            path: request.url,
        }

        if (typeof exceptionResponse === 'object' && 'errors' in exceptionResponse) {
            errorResponse.errors = (exceptionResponse as any).errors
        }

        response.status(status).json(errorResponse)
    }

    private extractMessage(exceptionResponse: string | object): string {
        if (typeof exceptionResponse === 'string') {
            return exceptionResponse
        }

        if ('message' in exceptionResponse) {
            const message = (exceptionResponse as any).message
            return Array.isArray(message) ? message[0] : message
        }

        return 'An error occurred'
    }

    private extractError(exceptionResponse: string | object): string {
        if (typeof exceptionResponse === 'object' && 'error' in exceptionResponse) {
            return (exceptionResponse as any).error
        }
        return 'Error'
    }
}