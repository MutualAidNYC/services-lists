import { getAllTaxonomies } from 'api'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async (_: NextApiRequest, res: NextApiResponse) => {
  const taxonomies = await getAllTaxonomies()
  res.status(200).json(taxonomies)
}
