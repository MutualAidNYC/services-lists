import { AirtableClient, AirtableCreateResponse } from './airtable'
import {
  Address,
  CreateServicesListRequest,
  Service,
  ServicesList,
  TaxonomyTerm,
} from 'models'

const ServicesClient = new AirtableClient(
  process.env.NEXT_PUBLIC_RESOURCES_API_KEY ?? '',
  process.env.NEXT_PUBLIC_RESOURCES_BASE_ID ?? ''
)

export const getServiceList = (id: string): Promise<ServicesList> => {
  return ServicesClient.getById<ServicesList>('Services Lists', id)
}

export const getService = (id: string): Promise<Service> => {
  return ServicesClient.getById<Service>('services', id)
}

export const getAddress = (id: string): Promise<Address> => {
  return ServicesClient.getById<Address>('physical_addresses', id)
}

export const getAllServicesLists = (
  filter?: string
): Promise<ServicesList[]> => {
  return ServicesClient.getAll<ServicesList>('Services Lists', filter)
}

export const getAllTaxonomies = (filter?: string): Promise<TaxonomyTerm[]> => {
  return ServicesClient.getAll<TaxonomyTerm>('taxonomy_term', filter)
}

export const getAllServices = (filter?: string): Promise<Service[]> => {
  return ServicesClient.getAll<Service>('services', filter)
}

export const createServicesLists = (
  servicesLists: CreateServicesListRequest[]
): Promise<AirtableCreateResponse[]> => {
  if (servicesLists.length < 1) {
    return new Promise((resolve) => {
      resolve([])
    })
  }

  return ServicesClient.createRecords<CreateServicesListRequest>(
    'Services Lists',
    servicesLists.map((list) => {
      return {
        fields: {
          name: list.name,
          description: list.description,
          Status: list.Status,
          Services: list.Services,
          creator: list.creator,
        },
      }
    })
  )
}
