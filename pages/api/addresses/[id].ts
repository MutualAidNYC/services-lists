import { findAddress } from 'api'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const taxonomies = await findAddress(req.query.id as string)
  res.status(200).json(taxonomies)
}
