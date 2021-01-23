import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

export type RequestConfig = AxiosRequestConfig
export type Response<T = any> = AxiosResponse<T>

export class Request {
  constructor(private readonly request = axios) {}

  public get<T = any>(
    url: string,
    config: RequestConfig = {}
  ): Promise<Response<T>> {
    return this.request.get<T, Response<T>>(url, config)
  }

  public static isRequestError(error: AxiosError): boolean {
    return !!(error.response && error.response.status)
  }
}
