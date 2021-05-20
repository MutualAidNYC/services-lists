import { AirtableClient } from './airtable'
import { 
  Service,
  ServicesLists,
 } from '../models'
import { keys } from 'ts-transformer-keys'

const resourcesClient = new AirtableClient(process.env.RESOURCES_API_KEY, process.env.RESOURCES_BASE_ID)

export const getServiceById = (id: string): Promise<Service> => {
  return resourcesClient.getById<Service>('services', keys<Service>(), id)
}

export const getServicesLists = (filter?: string): Promise<ServicesLists[]> => {
  return resourcesClient.get<ServicesLists>('Services Lists', keys<ServicesLists>(), filter)
}
