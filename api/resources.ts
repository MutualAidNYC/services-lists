import { AirtableClient } from './airtable'
import { 
  Service,
  ServicesList,
 } from '../models'
import { keys } from 'ts-transformer-keys'

const resourcesClient = new AirtableClient(process.env.NEXT_PUBLIC_RESOURCES_API_KEY, process.env.NEXT_PUBLIC_RESOURCES_BASE_ID)

export const getServiceById = (id: string): Promise<Service> => {
  return resourcesClient.getById<Service>('services', keys<Service>(), id)
}

export const getServicesLists = (filter?: string): Promise<ServicesList[]> => {
  return resourcesClient.get<ServicesList>('Services Lists', keys<ServicesList>(), filter)
}
