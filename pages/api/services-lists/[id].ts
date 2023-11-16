import { ResourcesAirtableClient } from 'database'
import { Collection } from 'models'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async (
  req: NextApiRequest,
  res: NextApiResponse<Collection>
) => {
  res
    .status(200)
    .json(
      (
        await ResourcesAirtableClient.find<Collection>(
          'Resource Lists',
          req.query.id as string
        )
      ).fields
    )
}
