import axios, { AxiosInstance } from 'axios'

export class AxiosClient {
  instance: AxiosInstance

  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL: baseURL,
    })
  }
}
