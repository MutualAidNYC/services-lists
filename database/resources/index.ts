import { AirtableClient } from 'database'

export const ResourcesAirtableClient = new AirtableClient(
  process.env.NEXT_PUBLIC_RESOURCES_API_KEY ?? '',
  process.env.NEXT_PUBLIC_RESOURCES_BASE_ID ?? ''
)

export * from './needs'
export * from './neighborhoods'
