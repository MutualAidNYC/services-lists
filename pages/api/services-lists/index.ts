import { QueryParams } from 'airtable/lib/query_params'
import { createServicesLists } from 'apiFunctions'
import { ResourcesAirtableClient } from 'database'
import { Collection, CreateServicesListRequest } from 'models'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Cache } from 'utils'
import { addToUserOwnedLists } from 'utils/firebase'

const selectAllCollections = async (
  queryParams?: QueryParams<Collection>
): Promise<Collection[]> => {
  return (
    await ResourcesAirtableClient.selectAll<Collection>(
      'Resource Lists',
      queryParams
    )
  ).map((record) => record.fields)
}

const cache = new Cache(selectAllCollections, 'GET /api/services-lists')

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET': {
      res.status(200).json(
        await cache.getCachedData({
          filterByFormula: req.query.filter as string,
        })
      )
      break
    }
    case 'POST': {
      const userIds = req.body.map((listData: { userId: string | null }) => {
        return listData.userId
      })
      const createdServicesLists = await createServicesLists(
        req.body as CreateServicesListRequest[]
      )
      for (let idx = 0; idx < userIds.length; idx++) {
        const userId = userIds[idx]
        const listId = createdServicesLists[idx].id
        if (!(userId === null)) {
          addToUserOwnedLists(listId, userId)
        }
      }
      res.status(200).json(createdServicesLists)
      break
    }
    default:
      res.status(405).send(`Method [${req.method}] not allowed`)
  }
}
