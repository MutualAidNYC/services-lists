import { ResourcesAirtableClient } from 'database'
import { Resource } from 'models'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse<Resource>) => {
  res
    .status(200)
    .json(
      (
        await ResourcesAirtableClient.find<Resource>(
          'Resources',
          req.query.id as string
        )
      ).fields
    )
}
