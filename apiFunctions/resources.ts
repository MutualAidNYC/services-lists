import {
  CreateServicesListRequest,
  Need,
  Neighborhood,
  Resource,
  ServicesList,
} from 'models'
import { AxiosClient } from './clients'

const httpClient = new AxiosClient('/api')

// HTTP client functions

export const getResource = async (id: string): Promise<Resource> => {
  const response = await httpClient.get<Resource>(`/services/${id}`)
  return response.data
}

export const getAllResources = async (filter = ''): Promise<Resource[]> => {
  const response = await httpClient.get<Resource[]>(
    `/services?filter=${filter}`
  )
  return response.data
}

export const getServicesList = async (id: string): Promise<ServicesList> => {
  const response = await httpClient.get<ServicesList>(`/services-lists/${id}`)
  return response.data
}

export const getAllServicesLists = async (
  filter = ''
): Promise<ServicesList[]> => {
  const response = await httpClient.get<ServicesList[]>(
    `/services-lists?filter=${filter}`
  )
  return response.data
}

export const postServicesList = async (
  data: CreateServicesListRequest[]
): Promise<AirtableCreateResponse[]> => {
  const response = await httpClient.post<
    AirtableCreateResponse[],
    CreateServicesListRequest[]
  >('/services-lists', data)
  return response.data
}

export const getAllNeeds = async (filter = ''): Promise<Need[]> => {
  const response = await httpClient.get<Need[]>(`/needs?filter=${filter}`)
  return response.data
}

export const getAllNeighborhoods = async (
  filter = ''
): Promise<Neighborhood[]> => {
  const response = await httpClient.get<Neighborhood[]>(
    `/neighborhoods?filter=${filter}`
  )
  return response.data
}

// Airtable functions

export const createServicesLists = (
  servicesLists: CreateServicesListRequest[]
): Promise<AirtableCreateResponse[]> => {
  if (servicesLists.length < 1) {
    return new Promise((resolve) => {
      resolve([])
    })
  }
  return ServicesAirtableClient.create<CreateServicesListRequest>(
    'Resource Lists',
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
