import axios, {AxiosInstance, AxiosError, AxiosResponse} from 'axios'
import {IHttpClient, HttpResponse, HttpError, RequestConfig} from './http-client.interface'

export class AxiosHttpClient implements IHttpClient {
    private client: AxiosInstance

    constructor(baseURL: string) {
        this.client = axios.create({
            baseURL,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
            },
        })

        // Response interceptor
        this.client.interceptors.response.use(
            (response) => response,
            (error: AxiosError) => {
                return Promise.reject(this.handleError(error))
            }
        )
    }

    private handleError(error: AxiosError): HttpError {
        if (error.response) {
            return {
                message: (error.response.data as any)?.message || error.message,
                status: error.response.status,
                errors: (error.response.data as any)?.errors,
            }
        } else if (error.request) {
            return {
                message: 'No response from server',
                status: 0,
            }
        } else {
            // Something else happened
            return {
                message: error.message,
                status: 0,
            }
        }
    }

    private mapResponse<T>(response: AxiosResponse<T>): HttpResponse<T> {
        return {
            data: response.data,
            status: response.status,
            statusText: response.statusText,
        }
    }

    async get<T = any>(url: string, config?: RequestConfig): Promise<HttpResponse<T>> {
        const response = await this.client.get<T>(url, config)
        return this.mapResponse(response)
    }

    async post<T = any>(url: string, data?: any, config?: RequestConfig): Promise<HttpResponse<T>> {
        const response = await this.client.post<T>(url, data, config)
        return this.mapResponse(response)
    }

    async put<T = any>(url: string, data?: any, config?: RequestConfig): Promise<HttpResponse<T>> {
        const response = await this.client.put<T>(url, data, config)
        return this.mapResponse(response)
    }

    async patch<T = any>(url: string, data?: any, config?: RequestConfig): Promise<HttpResponse<T>> {
        const response = await this.client.patch<T>(url, data, config)
        return this.mapResponse(response)
    }

    async delete<T = any>(url: string, config?: RequestConfig): Promise<HttpResponse<T>> {
        const response = await this.client.delete<T>(url, config)
        return this.mapResponse(response)
    }
}