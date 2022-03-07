export class Cache<TData, TInput> {
  private data?: TData
  private cachedTime?: number
  private readonly getData: (input?: TInput) => Promise<TData>
  private readonly apiRoute: string
  private readonly timeout: number // milliseconds

  constructor(
    getData: (input?: TInput) => Promise<TData>,
    apiRoute: string,
    timeout = 6000
  ) {
    this.getData = getData
    this.timeout = timeout
    this.apiRoute = apiRoute
  }

  async getCachedData(input?: TInput): Promise<TData> {
    const currTime = Date.now()
    if (
      this.data === undefined ||
      this.cachedTime === undefined ||
      currTime - this.timeout > this.cachedTime
    ) {
      this.data = await this.getData(input)
      this.cachedTime = currTime

      console.log('Returning data from API:', this.apiRoute)
      return this.data
    }

    console.log('Returning cached data:', this.apiRoute)
    return this.data
  }
}
