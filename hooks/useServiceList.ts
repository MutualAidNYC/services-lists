import { createContext, useContext } from 'react'
import { useQueries, useQuery, UseQueryOptions } from 'react-query'
import { getServiceListById, getServiceById, getAddressById } from '../api'
import { Address, Service, ServicesList } from '../models'

export interface ServiceListHandler {
  isLoading: boolean
  listName: string
  services: Service[]
  addressIdToServiceName: Record<string, string>
  addresses: Address[]
  defaultMapCenter: google.maps.LatLngLiteral
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

  const addressIdToServiceName: Record<string, string> = {}
  const addressQueryOptions = services
    .filter(service => service?.addresses) // not all services have addresses
    .flatMap(service => { // need to flatten because some services have multiple addresses
      service?.addresses?.forEach(addressId => addressIdToServiceName[addressId] = service.name)
      return service?.addresses
    })
    .map(addressId => {
      return {
        queryKey: ['address', addressId],
        queryFn: () => getAddressById(addressId ?? ''),
        config: {
          enabled: !!addressId,
          retry: false,
          refetchOnWindowFocus: false,
        }
      }
    }) ?? [] // cannot be undefined or useQueries throws an error
  const addressQueryResults = useQueries<UseQueryOptions<Address, Error>[]>(addressQueryOptions)
  const isLoadingAddresses = addressQueryResults.some(result => result.isLoading)
  const addresses = addressQueryResults.map(result => result.data)

  return {
    isLoading: isLoadingServiceList || isLoadingServices || isLoadingAddresses,
    listName: serviceList?.name ?? '',
    services: services.some(service => !service) ? [] : services as Service[], // return empty list if any service is undefined
    addressIdToServiceName,
    addresses: addresses.some(address => !address) ? [] : addresses as Address[], // return empty list if any address is undefined
    defaultMapCenter: {lat: 40.730610, lng: -73.935242}, // NYC lat, lng
  }
}
