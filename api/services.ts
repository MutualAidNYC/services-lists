import { AirtableClient, AirtableCreateResponse, AxiosClient } from './clients'
import {
  Address,
  CreateServicesListRequest,
  Resource,
  ServicesList,
  TaxonomyTerm,
} from 'models'

const ServicesAxiosClient = new AxiosClient('/api')

const ServicesAirtableClient = new AirtableClient(
  process.env.NEXT_PUBLIC_RESOURCES_API_KEY ?? '',
  process.env.NEXT_PUBLIC_RESOURCES_BASE_ID ?? ''
)

// HTTP client functions

export const getAddress = async (id: string): Promise<Address> => {
  const response = await ServicesAxiosClient.get<Address>(`/addresses/${id}`)
  return response.data
}

export const getService = async (id: string): Promise<Resource> => {
  const response = await ServicesAxiosClient.get<Resource>(`/services/${id}`)
  return response.data
}

export const getAllServices = async (filter = ''): Promise<Resource[]> => {
  const response = await ServicesAxiosClient.get<Resource[]>(
    `/services?filter=${filter}`
  )
  return response.data
}

export const getServicesList = async (id: string): Promise<ServicesList> => {
  const response = await ServicesAxiosClient.get<ServicesList>(
    `/services-lists/${id}`
  )
  return response.data
}

export const getAllServicesLists = async (
  filter = ''
): Promise<ServicesList[]> => {
  const response = await ServicesAxiosClient.get<ServicesList[]>(
    `/services-lists?filter=${filter}`
  )
  return response.data
}

export const postServicesList = async (
  data: CreateServicesListRequest[]
): Promise<AirtableCreateResponse[]> => {
  const response = await ServicesAxiosClient.post<
    AirtableCreateResponse[],
    CreateServicesListRequest[]
  >('/services-lists', data)
  return response.data
}

export const getAllTaxonomies = async (
  filter = ''
): Promise<TaxonomyTerm[]> => {
  const response = await ServicesAxiosClient.get<TaxonomyTerm[]>(
    `/taxonomies?filter=${filter}`
  )
  return response.data
}

// Airtable functions

export const findAddress = (id: string): Promise<Address> => {
  return ServicesAirtableClient.find<Address>('physical_addresses', id)
}

export const findService = (id: string): Promise<Resource> => {
  return ServicesAirtableClient.find<Resource>('services', id)
}

export const selectAllServices = (
  filterFormula?: string
): Promise<Resource[]> => {
  return ServicesAirtableClient.selectAll<Resource>('services', filterFormula)
}

export const findServiceList = (id: string): Promise<ServicesList> => {
  return ServicesAirtableClient.find<ServicesList>('Services Lists', id)
}

export const selectAllServicesLists = (
  filterFormula?: string
): Promise<ServicesList[]> => {
  return ServicesAirtableClient.selectAll<ServicesList>(
    'Services Lists',
    filterFormula
  )
}

export const createServicesLists = (
  servicesLists: CreateServicesListRequest[]
): Promise<AirtableCreateResponse[]> => {
  if (servicesLists.length < 1) {
    return new Promise((resolve) => {
      resolve([])
    })
  }

  return ServicesAirtableClient.create<CreateServicesListRequest>(
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

export const selectAllTaxonomies = (
  filterFormula?: string
): Promise<TaxonomyTerm[]> => {
  return ServicesAirtableClient.selectAll<TaxonomyTerm>(
    'taxonomy_term',
    filterFormula
  )
}
