import { QueryParams } from 'airtable/lib/query_params'
import { ResourcesAirtableClient } from 'database'
import { Resource } from 'models'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Cache } from 'utils'

const selectAllResources = async (
  queryParams?: QueryParams<Resource>
): Promise<Resource[]> => {
  return (
    await ResourcesAirtableClient.selectAll<Resource>('Ref - Need', queryParams)
  ).map((record) => record.fields)
}

const cache = new Cache(selectAllResources, 'GET /api/resources')

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res
    .status(200)
    .json(cache.getCachedData({ filterByFormula: req.query.filter as string }))
}
