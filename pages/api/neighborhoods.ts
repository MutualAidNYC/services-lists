import { QueryParams } from 'airtable/lib/query_params'
import { ResourcesAirtableClient } from 'database'
import { Neighborhood } from 'models'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Cache } from 'utils'

export const selectAllNeighborhoods = async (
  queryParams?: QueryParams<Neighborhood>
): Promise<Neighborhood[]> => {
  return (
    await ResourcesAirtableClient.selectAll<Neighborhood>(
      'Ref - Neighborhoods',
      queryParams
    )
  ).map((record) => record.fields)
}

const cache = new Cache(selectAllNeighborhoods, 'GET /api/neighborhoods')

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res
    .status(200)
    .json(
      await cache.getCachedData({ filterByFormula: req.query.filter as string })
    )
}
