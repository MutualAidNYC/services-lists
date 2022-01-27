import { AirtableClient } from './airtable'
import { Address, Service, ServicesList, TaxonomyTerm } from '../models'

const ServicesClient = new AirtableClient(
  process.env.NEXT_PUBLIC_RESOURCES_API_KEY ?? '',
  process.env.NEXT_PUBLIC_RESOURCES_BASE_ID ?? '',
)

export const getServiceListById = (id: string): Promise<ServicesList> => {
  return ServicesClient.getById<ServicesList>('Services Lists', id)
}

export const getServiceById = (id: string): Promise<Service> => {
  return ServicesClient.getById<Service>('services', id)
}

export const getAddressById = (id: string): Promise<Address> => {
  return ServicesClient.getById<Address>('physical_addresses', id)
}

export const getAllServicesLists = (filter?: string): Promise<ServicesList[]> => {
  return ServicesClient.getAll<ServicesList>(
    'Services Lists',
    filter,
  )
}

export const getAllTaxonomies = (filter?: string): Promise<TaxonomyTerm[]> => {
  return ServicesClient.getAll<TaxonomyTerm>(
    'taxonomy_term',
    filter,
  )
}

export const getAllServices = (filter?: string): Promise<Service[]> => {
  return ServicesClient.getAll<Service>(
    'services',
    filter,
  )
}
