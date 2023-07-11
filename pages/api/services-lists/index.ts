import { createServicesLists, selectAllServicesLists } from 'apiFunctions'
import { CreateServicesListRequest } from 'models'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Cache } from 'utils'
import { addToUserOwnedLists } from 'utils/firebase'

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
      req.body.forEach((listData: { userId: string | null }, idx: number) => {
        const userId = listData.userId
        const listId = createdServicesLists[idx].id
        if (!(userId === null)) {
          addToUserOwnedLists(listId, userId)
        }
      })
      res.status(200).json(createdServicesLists)
      break
    }
    default:
      res.status(405).send(`Method [${req.method}] not allowed`)
  }
}
