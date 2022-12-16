import { selectAllTaxonomies } from 'api'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Cache } from 'utils'

const cache = new Cache(selectAllTaxonomies, 'GET /api/taxonomies')

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const taxonomies = await cache.getCachedData(req.query.filter as string)
  res.status(200).json(taxonomies)
}
