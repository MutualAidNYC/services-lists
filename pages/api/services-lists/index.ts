import { createServicesLists, selectAllServicesLists } from 'api'
import { CreateServicesListRequest } from 'models'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Cache } from 'utils'

const cache = new Cache(selectAllServicesLists, 'GET /api/services-lists')

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET': {
      const servicesLists = await cache.getCachedData(
        req.query.filter as string
      )
      res.status(200).json(servicesLists)
      break
    }
    case 'POST': {
      const createdServicesLists = await createServicesLists(
        req.body as CreateServicesListRequest[]
      )
      res.status(200).json(createdServicesLists)
      break
    }
    default:
      res.status(405).send(`Method [${req.method}] not allowed`)
  }
}
