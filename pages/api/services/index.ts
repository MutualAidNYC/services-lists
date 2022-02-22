import { getAllServices } from 'api'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Cache } from 'utils'

const cache = new Cache(getAllServices, 'GET /api/services')

export default async (_: NextApiRequest, res: NextApiResponse) => {
  const services = await cache.getCachedData()
  res.status(200).json(services)
}
