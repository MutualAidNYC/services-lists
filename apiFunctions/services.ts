import { AirtableClient, AirtableCreateResponse } from 'database'
import {
  Collection,
  CreateServicesListRequest,
  Need,
  Community,
  Resource,
  ServicesList,
  Service
} from 'models'
import { AxiosClient } from './axios'

const ServicesAxiosClient = new AxiosClient('/api')

const ServicesAirtableClient = new AirtableClient(
  process.env.NEXT_PUBLIC_RESOURCES_API_KEY ?? '',
  process.env.NEXT_PUBLIC_RESOURCES_BASE_ID ?? ''
)

// HTTP client functions

export const getService = async (id: string): Promise<Service> => {
  const response = await ServicesAxiosClient.get<Service>(`/services/${id}`)
  return response.data
}

export const getAllResources = async (filter = ''): Promise<Service[]> => {
  const response = await ServicesAxiosClient.get<Service[]>(
    `/services?filter=${filter}`
  )
  return response.data
}

export const getCollection = async (id: string): Promise<Collection> => {
  const response = await ServicesAxiosClient.get<Collection>(
    `/services-lists/${id}`
  )
  return {...response.data, id}
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

export const getAllNeeds = async (filter = ''): Promise<Need[]> => {
  const response = await ServicesAxiosClient.get<Need[]>(
    `/needs?filter=${filter}`
  )
  return response.data
}

export const getAllCommunities = async (
  filter = ''
): Promise<Community[]> => {
  const response = await ServicesAxiosClient.get<Community[]>(
    `/communities?filter=${filter}`
  )
  return response.data
}

// Airtable functions

export const findService = (id: string): Promise<Resource> => {
  return ServicesAirtableClient.find<Resource>('services', id)
}

export const selectAllServices = (
  filterFormula?: string
): Promise<Resource[]> => {
  return ServicesAirtableClient.selectAll<Resource>('services', filterFormula)
}

export const findCollection = (id: string): Promise<Collection> => {
  return ServicesAirtableClient.find<Collection>('x-Resources Lists', id)
}

export const selectAllServicesLists = (
  filterFormula?: string
): Promise<ServicesList[]> => {
  return ServicesAirtableClient.selectAll<ServicesList>(
    'x-Resources Lists',
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
    'x-Resources Lists',
    servicesLists.map((list) => {
      if ('userId' in list) {
        delete list.userId
      }
      return {
        fields: {
          ...list,
        },
      }
    })
  )
}
