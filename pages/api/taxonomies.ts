import { getAllTaxonomies } from 'api'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Cache } from 'utils'

const cache = new Cache(getAllTaxonomies, 'GET /api/taxonomies')

export default async (_: NextApiRequest, res: NextApiResponse) => {
  const taxonomies = await cache.getCachedData()
  res.status(200).json(taxonomies)
}
