import { AirtableClient } from './airtable'
import { Service } from '../models'
import { keys } from 'ts-transformer-keys'

const resourcesClient = new AirtableClient(process.env.RESOURCES_API_KEY, process.env.RESOURCES_BASE_ID)

export const getServices = (filter?: string): Promise<Service[]> => {
  return resourcesClient.get<Service>('services', keys<Service>(), filter)
}
