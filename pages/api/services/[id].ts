import { findService } from 'apiFunctions'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const service = await findService(req.query.id as string)
  res.status(200).json(service)
}
