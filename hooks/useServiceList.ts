import { createContext, useContext } from 'react'
import { useQueries, useQuery, UseQueryOptions } from 'react-query'
import { getServiceListById, getServiceById, getLocationById } from '../api'
import { Coordinate, Location, Service, ServicesList } from '../models'

export interface ServiceListHandler {
  isLoading: boolean
  listName: string
  services: Service[]
  coordinateToServiceMap: Map<Coordinate, string>
  defaultMapCenter: Coordinate
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
  const isLoadingServices = serviceQueryResults.some(result => result.isLoading)
  const services = serviceQueryResults.map(result => result.data)

  const locationIdToServiceMap: Record<string, string> = {}
  const locationQueryOptions = services
    .filter(service => service?.locations) // not all services have locations
    .flatMap(service => { // need to flatten because some services have multiple locations
      service?.locations?.forEach(locationId => locationIdToServiceMap[locationId] = service.name)
      return service?.locations
    })
    .map(locationId => {
      return {
        queryKey: ['location', locationId],
        queryFn: () => getLocationById(locationId ?? ''),
        config: {
          enabled: !!locationId,
          retry: false,
          refetchOnWindowFocus: false,
        }
      }
    }) ?? [] // cannot be undefined or useQueries throws an error
  const locationQueryResults = useQueries<UseQueryOptions<Location, Error>[]>(locationQueryOptions)
  const isLoadingLocations = locationQueryResults.some(result => result.isLoading)
  const coordinateToServiceMap = new Map<Coordinate, string>()
  locationQueryResults.forEach(result => {
    // skip mapping if id is undefined
    if (!result.data?.id) {
      return
    }

    const coordinate = {
      longitude: Number(result.data.latitude),
      latitude: Number(result.data.longitude),
    }

    coordinateToServiceMap.set(coordinate, locationIdToServiceMap[result.data.id])
  })

  return {
    isLoading: isLoadingServiceList || isLoadingServices || isLoadingLocations,
    listName: serviceList?.name ?? '',
    services: services.some(service => !service) ? [] : services as Service[], // return empty list if any service is undefined
    coordinateToServiceMap,
    defaultMapCenter: {longitude: -73.935242, latitude: 40.730610}, // NYC lat, lng
  }
}
