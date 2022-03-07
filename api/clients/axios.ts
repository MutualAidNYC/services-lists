import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

export class AxiosClient {
  instance: AxiosInstance

  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL: baseURL,
    })
  }

  get<T = any, D = any, R = AxiosResponse<T, D>>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<R> {
    return this.instance.get(url, config)
  }

  post<T = any, D = any, R = AxiosResponse<T, D>>(
    url: string,
    data: D,
    config?: AxiosRequestConfig<D>
  ): Promise<R> {
    return this.instance.post(url, data, config)
  }
}
