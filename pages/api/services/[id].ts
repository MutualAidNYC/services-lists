import { getService } from 'api'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const service = await getService(req.query.id as string)
  res.status(200).json(service)
}
