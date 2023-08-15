import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

export class AxiosClient {
  instance: AxiosInstance

  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL: baseURL,
    })
  }

  post<T = any, D = any, R = AxiosResponse<T, D>>( // eslint-disable-line @typescript-eslint/no-explicit-any
    url: string,
    data: D,
    config?: AxiosRequestConfig<D>
  ): Promise<R> {
    return this.instance.post(url, data, config)
  }

  get<T = any, D = any, R = AxiosResponse<T, D>>( // eslint-disable-line @typescript-eslint/no-explicit-any
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<R> {
    return this.instance.get(url, config)
  }
}
