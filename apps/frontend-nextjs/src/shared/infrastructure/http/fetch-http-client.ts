import {IHttpClient, HttpResponse, HttpError, RequestConfig} from './http-client.interface'

export class FetchHttpClient implements IHttpClient {
    constructor(private baseURL: string) {
    }

    private async handleResponse<T>(response: Response): Promise<HttpResponse<T>> {
        const data = await response.json().catch(() => null)

        if (!response.ok) {
            const error: HttpError = {
                message: data?.message || response.statusText,
                status: response.status,
                errors: data?.errors,
            }
            throw error
        }

        return {
            data,
            status: response.status,
            statusText: response.statusText,
        }
    }

    private buildUrl(url: string, params?: Record<string, any>): string {
        const fullUrl = new URL(url, this.baseURL)
        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                fullUrl.searchParams.append(key, String(value))
            })
        }
        return fullUrl.toString()
    }

    async get<T = any>(url: string, config?: RequestConfig): Promise<HttpResponse<T>> {
        const response = await fetch(this.buildUrl(url, config?.params), {
            method: 'GET',
            headers: config?.headers,
        })
        return this.handleResponse<T>(response)
    }

    async post<T = any>(url: string, data?: any, config?: RequestConfig): Promise<HttpResponse<T>> {
        const response = await fetch(this.buildUrl(url, config?.params), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...config?.headers,
            },
            body: JSON.stringify(data),
        })
        return this.handleResponse<T>(response)
    }

    async put<T = any>(url: string, data?: any, config?: RequestConfig): Promise<HttpResponse<T>> {
        const response = await fetch(this.buildUrl(url, config?.params), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...config?.headers,
            },
            body: JSON.stringify(data),
        })
        return this.handleResponse<T>(response)
    }

    async patch<T = any>(url: string, data?: any, config?: RequestConfig): Promise<HttpResponse<T>> {
        const response = await fetch(this.buildUrl(url, config?.params), {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                ...config?.headers,
            },
            body: JSON.stringify(data),
        })
        return this.handleResponse<T>(response)
    }

    async delete<T = any>(url: string, config?: RequestConfig): Promise<HttpResponse<T>> {
        const response = await fetch(this.buildUrl(url, config?.params), {
            method: 'DELETE',
            headers: config?.headers,
        })
        return this.handleResponse<T>(response)
    }
}