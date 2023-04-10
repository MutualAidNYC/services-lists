import { AirtableClient, AirtableCreateResponse } from 'database'
import { CreateServicesListRequest, Need, Resource, ServicesList } from 'models'
import { AxiosClient } from './clients'

const ServicesAxiosClient = new AxiosClient('/api')

const ServicesAirtableClient = new AirtableClient(
  process.env.NEXT_PUBLIC_RESOURCES_API_KEY ?? '',
  process.env.NEXT_PUBLIC_RESOURCES_BASE_ID ?? ''
)

// HTTP client functions

export const getService = async (id: string): Promise<Resource> => {
  const response = await ServicesAxiosClient.get<Resource>(`/services/${id}`)
  return response.data
}

export const getAllResources = async (filter = ''): Promise<Resource[]> => {
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

export const getAllNeeds = async (filter = ''): Promise<Need[]> => {
  const response = await ServicesAxiosClient.get<Need[]>(
    `/taxonomies?filter=${filter}`
  )
  return response.data
}

// Airtable functions

export const findService = (id: string): Promise<Resource> => {
  return ServicesAirtableClient.find<Resource>('Resources', id)
}

export const selectAllServices = (
  filterFormula?: string
): Promise<Resource[]> => {
  return ServicesAirtableClient.selectAll<Resource>('Resources', filterFormula)
}

export const findServiceList = (id: string): Promise<ServicesList> => {
  return ServicesAirtableClient.find<ServicesList>('Resource Lists', id)
}

export const selectAllServicesLists = (
  filterFormula?: string
): Promise<ServicesList[]> => {
  return ServicesAirtableClient.selectAll<ServicesList>(
    'Resource Lists',
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
    'Resource Lists',
    servicesLists.map((list) => {
      return {
        fields: {
          name: list.name,
          description: list.description,
          Status: list.Status,
          Resources: list.Resources,
          creator: list.creator,
        },
      }
    })
  )
}
