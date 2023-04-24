import { selectAllServices } from 'apiFunctions'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Cache } from 'utils'

const cache = new Cache(selectAllServices, 'GET /api/services')

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const services = await cache.getCachedData(req.query.filter as string)
  res.status(200).json(services)
}
