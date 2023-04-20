import { findServiceList } from 'apiFunctions'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const serviceList = await findServiceList(req.query.id as string)
  res.status(200).json(serviceList)
}
