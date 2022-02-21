import { getAllTaxonomies } from 'api'
import type { NextApiRequest, NextApiResponse } from 'next'

const TAXONOMIES_CACHE_TIMEOUT = 60 * 1000 // 60 Seconds

// Caching to circumvent Airtable API Limits
var taxonomies_caches_time: number
var taxonomies_caches_data: any

export default async (_: NextApiRequest, res: NextApiResponse) => {
  const taxonomies = getAllTaxonomiesCached()
  res.status(200).json(taxonomies)
}

async function getAllTaxonomiesCached() {
  const curr_time = Date.now()
  if (
    taxonomies_caches_time == null ||
    taxonomies_caches_data == null ||
    curr_time - TAXONOMIES_CACHE_TIMEOUT > taxonomies_caches_time
  ) {
    const taxonomies = await getAllTaxonomies()
    taxonomies_caches_time = curr_time
    taxonomies_caches_data = taxonomies
    console.log('Retreiving Taxonomies from Airtable')
    return taxonomies
  } else {
    console.log('Retreiving Cached Taxonomies')
    return taxonomies_caches_data
  }
}
