import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

class HttpAdapter {
  private axiosInstance: AxiosInstance

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    this.initializeResponseInterceptor()
  }

  private initializeResponseInterceptor = () => {
    this.axiosInstance.interceptors.response.use(
      this.handleResponse,
      this.handleError
    )
  }

  private handleResponse = (response: AxiosResponse) => {
    return response
  }

  private handleError = (error: any) => {
    return Promise.reject(error)
  }

  public get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.get<T>(url, config)
  }

  public post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.post<T>(url, data, config)
  }

  public put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.put<T>(url, data, config)
  }

  public delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.delete<T>(url, config)
  }
}

export default HttpAdapter
