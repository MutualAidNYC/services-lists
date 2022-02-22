import { createServicesLists, getAllServicesLists } from 'api'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Cache } from 'utils'

const cache = new Cache(getAllServicesLists, 'GET /api/services-lists')

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      const servicesLists = await cache.getCachedData()
      res.status(200).json(servicesLists)
    case 'POST':
      const createdServicesLists = await createServicesLists(req.body)
      res.status(200).json(createdServicesLists)
    default:
      res.status(405)
  }
}
