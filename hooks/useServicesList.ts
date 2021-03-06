import { createContext, useContext } from 'react'
import { useQueries, useQuery, UseQueryOptions } from 'react-query'
import { getServicesList, getService, getAddress } from 'api'
import { Address, Service, ServicesList } from 'models'
import { useFilters } from './useFilters'

export interface ServiceListHandler {
  isLoading: boolean
  listName: string
  visibleServices: Service[]
  numServices: number
  setSearchQuery: (query: string) => void
  addressIdToServiceName: Record<string, string>
  addresses: Address[]
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
    serviceList?.Services?.map((serviceId) => {
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
  const serviceQueryResults =
    useQueries<UseQueryOptions<Service, Error>[]>(servicesQueryOptions)
  const isLoadingServices = serviceQueryResults.some(
    (result) => result.isLoading
  )
  const baseServices = serviceQueryResults.map((result) => result.data)
  const { filteredData: filteredServices, setSearchQuery } = useFilters(
    isLoadingServices ? [] : (baseServices as Service[]),
    ['name', 'description'],
    'taxonomyString'
  )

  const addressIdToServiceName: Record<string, string> = {}
  const addressQueryOptions =
    baseServices
      .filter((service) => service?.address) // not all services have addresses
      .flatMap((service) => {
        // need to flatten because some services have multiple addresses
        service?.address?.forEach(
          (addressId) => (addressIdToServiceName[addressId] = service.name)
        )
        return service?.address
      })
      .map((addressId) => {
        return {
          queryKey: ['address', addressId],
          queryFn: () => getAddress(addressId ?? ''),
          config: {
            enabled: !!addressId,
            retry: false,
            refetchOnWindowFocus: false,
          },
        }
      }) ?? [] // cannot be undefined or useQueries throws an error
  const addressQueryResults =
    useQueries<UseQueryOptions<Address, Error>[]>(addressQueryOptions)
  const isLoadingAddresses = addressQueryResults.some(
    (result) => result.isLoading
  )
  const addresses = addressQueryResults.map((result) => result.data)

  return {
    isLoading: isLoadingServiceList || isLoadingServices || isLoadingAddresses,
    listName: serviceList?.name ?? '',
    visibleServices: filteredServices,
    numServices: baseServices.length,
    setSearchQuery,
    addressIdToServiceName,
    addresses: addresses.some((address) => !address)
      ? []
      : (addresses as Address[]), // return empty list if any address is undefined
    defaultMapCenter: { lat: 40.73061, lng: -73.935242 }, // NYC lat, lng
  }
}
