import { selectAllNeeds } from 'database'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Cache } from 'utils'

const cache = new Cache(selectAllNeeds, 'GET /api/needs')

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json(await cache.getCachedData(req.query.filter as string))
}
