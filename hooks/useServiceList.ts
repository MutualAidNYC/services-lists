import { createContext, useContext } from 'react'
import { useQueries, useQuery, UseQueryOptions } from 'react-query'
import { getServiceListById, getServiceById } from '../api'
import { Service, ServicesList } from '../models'

export interface ServiceListHandler {
  isLoading: boolean
  listName: string
  services: Service[]
}

const ServiceListContext = createContext({} as ServiceListHandler)
export const ServiceListProvider = ServiceListContext.Provider
export const useServiceListContext = (): ServiceListHandler => useContext(ServiceListContext)

export const useServiceList = (listId: string): ServiceListHandler => {
  const {
    isLoading: isLoadingServiceList,
    data: serviceList,
  } = useQuery<ServicesList, Error>(
    ['serviceList', listId],
    () => getServiceListById(listId),
    {
      enabled: !!listId,
      retry: false,
      refetchOnWindowFocus: false,
    }
  )

  const servicesQueryOptions = serviceList?.Services?.map(serviceId => {
    return {
      queryKey: ['service', serviceId],
      queryFn: () => getServiceById(serviceId),
      config: {
        enabled: !!serviceId,
        retry: false,
        refetchOnWindowFocus: false,
      }
    }
  }) ?? [] // cannot be undefined or useQueries throws an error
  const serviceQueryResults = useQueries<UseQueryOptions<Service, Error>[]>(servicesQueryOptions)
  const isLoadingServices = serviceQueryResults?.some(result => result.isLoading)
  const services = serviceQueryResults?.map(result => result.data)

  return {
    isLoading: isLoadingServiceList || isLoadingServices,
    listName: serviceList?.name,
    services,
  }
}
