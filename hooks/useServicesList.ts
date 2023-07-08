import { useQueries, useQuery, UseQueryOptions } from '@tanstack/react-query'
import { getService, getServicesList } from 'apiFunctions'
import { Resource, ServicesList } from 'models'
import { createContext, useContext } from 'react'
import { useFilters } from './useFilters'

export interface ServiceListHandler {
  isLoading: boolean
  listName: string
  visibleServices: Resource[]
  numServices: number
  setSearchQuery: (query: string) => void
  defaultMapCenter: google.maps.LatLngLiteral
}

const ServiceListContext = createContext({} as ServiceListHandler)
export const ServiceListProvider = ServiceListContext.Provider
export const useServiceListContext = (): ServiceListHandler =>
  useContext(ServiceListContext)

export const useServiceList = (listId: string): ServiceListHandler => {
  const { isLoading: isLoadingServiceList, data: serviceList } = useQuery<
    ServicesList,
    Error
  >(['serviceList', listId], () => getServicesList(listId), {
    enabled: !!listId,
    retry: false,
    refetchOnWindowFocus: false,
  })

  const servicesQueryOptions =
    serviceList?.resources?.map((serviceId) => {
      return {
        queryKey: ['service', serviceId],
        queryFn: () => getService(serviceId),
        config: {
          enabled: !!serviceId,
          retry: false,
          refetchOnWindowFocus: false,
        },
      }
    }) ?? [] // cannot be undefined or useQueries throws an error
  const serviceQueryResults = useQueries<UseQueryOptions<Resource, Error>[]>({
    queries: servicesQueryOptions,
  })
  const isLoadingServices = serviceQueryResults.some(
    (result) => result.isLoading
  )
  const baseServices = serviceQueryResults.map((result) => result.data)
  const { filteredData: filteredServices, setSearchQuery } = useFilters(
    isLoadingServices ? [] : (baseServices as Resource[]),
    ['title', 'details'],
    'needs'
  )

  return {
    isLoading: isLoadingServiceList || isLoadingServices,
    listName: serviceList?.name ?? '',
    visibleServices: filteredServices,
    numServices: baseServices.length,
    setSearchQuery,
    defaultMapCenter: { lat: 40.73061, lng: -73.935242 }, // NYC lat, lng
  }
}
