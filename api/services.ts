import { AirtableClient } from './airtable'
import { 
  Service,
  ServicesList,
 } from '../models'
import { keys } from 'ts-transformer-keys'

const ServicesClient = new AirtableClient(process.env.NEXT_PUBLIC_RESOURCES_API_KEY, process.env.NEXT_PUBLIC_RESOURCES_BASE_ID)

export const getServiceById = (id: string): Promise<Service> => {
  return ServicesClient.getById<Service>('services', keys<Service>(), id)
}

export const getServicesLists = (filter?: string): Promise<ServicesList[]> => {
  return ServicesClient.get<ServicesList>('Services Lists', keys<ServicesList>(), filter)
}
