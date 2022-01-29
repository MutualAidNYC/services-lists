import { AirtableClient } from './airtable'
import { Address, Service, ServicesList, TaxonomyTerm } from '../models'
import { keys } from 'ts-transformer-keys'

const ServicesClient = new AirtableClient(
  process.env.NEXT_PUBLIC_RESOURCES_API_KEY ?? '',
  process.env.NEXT_PUBLIC_RESOURCES_BASE_ID ?? '',
)

export const getServiceListById = (id: string): Promise<ServicesList> => {
  return ServicesClient.getById<ServicesList>('Services Lists', keys<ServicesList>(), id)
}

export const getServiceById = (id: string): Promise<Service> => {
  return ServicesClient.getById<Service>('services', keys<Service>(), id)
}

export const getAddressById = (id: string): Promise<Address> => {
  return ServicesClient.getById<Address>('physical_addresses', keys<Address>(), id)
}

export const getAllServicesLists = (filter?: string): Promise<ServicesList[]> => {
  return ServicesClient.getAll<ServicesList>(
    'Services Lists',
    keys<ServicesList>(),
    filter,
  )
}

export const getAllTaxonomies = (filter?: string): Promise<TaxonomyTerm[]> => {
  return ServicesClient.getAll<TaxonomyTerm>(
    'taxonomy_term',
    keys<TaxonomyTerm>(),
    filter,
  )
}

export const getAllServices = (filter?: string): Promise<Service[]> => {
  return ServicesClient.getAll<Service>(
    'services',
    keys<Service>(),
    filter,
  )
}

export const createServicesLists = (servicesLists: ServicesList[], publish: boolean): Promise<ServicesList[]> => {
  if (servicesLists.length < 1) {
    return new Promise(() => servicesLists)
  }

  return ServicesClient.createRows<ServicesList>('Services Lists', keys<ServicesList>(),
    servicesLists.map(list => {
      let listObject = {
        "fields": {
          "name": list.name,
          "description": list.description,
          "Status": ((publish) ? "Published" : "Draft"),
          "Services": list.Services,
          "creator": list.creator,
        }
      }
      return listObject
    })
  );
}