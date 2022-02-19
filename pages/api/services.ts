import { getAllServices } from 'api'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async (_: NextApiRequest, res: NextApiResponse) => {
  const services = await getAllServices()
  res.status(200).json(services)
}
