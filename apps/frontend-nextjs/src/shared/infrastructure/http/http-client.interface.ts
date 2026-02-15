
export interface HttpResponse<T = any> {
    data: T
    status: number
    statusText: string
}

export interface HttpError {
    message: string
    status: number
    errors?: Record<string, string[]>
}

export interface IHttpClient {
    get<T = any>(url: string, config?: RequestConfig): Promise<HttpResponse<T>>

    post<T = any>(url: string, data?: any, config?: RequestConfig): Promise<HttpResponse<T>>

    put<T = any>(url: string, data?: any, config?: RequestConfig): Promise<HttpResponse<T>>

    patch<T = any>(url: string, data?: any, config?: RequestConfig): Promise<HttpResponse<T>>

    delete<T = any>(url: string, config?: RequestConfig): Promise<HttpResponse<T>>
}

export interface RequestConfig {
    headers?: Record<string, string>
    params?: Record<string, any>
    timeout?: number
}