import { QueryParams } from 'airtable/lib/query_params'
import { ResourcesAirtableClient } from 'database'
import { Need } from 'models'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Cache } from 'utils'

const selectAllNeeds = async (
  queryParams?: QueryParams<Need>
): Promise<Need[]> => {
  return (
    await ResourcesAirtableClient.selectAll<Need>('Ref - Need', queryParams)
  ).map((record) => record.fields)
}

const cache = new Cache(selectAllNeeds, 'GET /api/needs')

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res
    .status(200)
    .json(
      await cache.getCachedData({ filterByFormula: req.query.filter as string })
    )
}
