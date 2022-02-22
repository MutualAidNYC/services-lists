export class Cache<T> {
  private data?: T
  private cachedTime?: number
  private readonly getData: () => Promise<T>
  private readonly apiRoute: string
  private readonly timeout: number // milliseconds

  constructor(getData: () => Promise<T>, apiRoute: string, timeout = 6000) {
    this.getData = getData
    this.timeout = timeout
    this.apiRoute = apiRoute
  }

  async getCachedData(): Promise<T> {
    const currTime = Date.now()
    if (
      this.data === undefined ||
      this.cachedTime === undefined ||
      currTime - this.timeout > this.cachedTime
    ) {
      this.data = await this.getData()
      this.cachedTime = currTime

      console.log('Returning data from API:', this.apiRoute)
      return this.data
    }

    console.log('Returning cached data:', this.apiRoute)
    return this.data
  }
}
