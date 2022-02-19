import { getAllServices } from 'api'
import type { NextApiRequest, NextApiResponse } from 'next'

// Caching to circumvent Airtable API Limits
var services_caches_time: number
var services_caches_data: any

export default async (_: NextApiRequest, res: NextApiResponse) => {
  const services = getAllServicesCached()
  res.status(200).json(services)
}

async function getAllServicesCached() { 
  const curr_time =  Date.now()
  if (services_caches_time == null || services_caches_data == null || curr_time - (60*1000) > services_caches_time) {
    const services = await getAllServices()
    services_caches_time = curr_time
    services_caches_data = services
    console.log('Retreiving Services from Airtable')
    return services
  } else {
    console.log('Retreiving Cached Services')
    return services_caches_data
  }
}