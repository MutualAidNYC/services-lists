import { useQueries, useQuery, UseQueryOptions } from '@tanstack/react-query'
import { getCollection, getService } from 'apiFunctions'
import { Collection, Service } from 'models'
import { useFilters } from './useFilters'

export interface ServiceListHandler {
  isLoading: boolean
  collection?: Collection
  visibleServices: Service[]
  numServices: number
  setSearchQuery: (query: string) => void
  defaultMapCenter: google.maps.LatLngLiteral
  setTaxonomyFilters: (filters: string[]) => void
  taxonomyFilters: string[]
}

export const useServiceList = (collectionId: string): ServiceListHandler => {
  const { isLoading: isLoadingCollection, data: collection } = useQuery(
    ['collection', collectionId],
    () => getCollection(collectionId),
    {
      enabled: !!collectionId,
      retry: false,
      refetchOnWindowFocus: false,
    }
  )
  console.log("collection: ", collection)

  const servicesQueryOptions =
    collection?.resources?.map((serviceId) => {
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
  const serviceQueryResults = useQueries<UseQueryOptions<Service, Error>[]>({
    queries: servicesQueryOptions,
  })
  const isLoadingServices = serviceQueryResults.some(
    (result) => result.isLoading
  )
  const baseServices = serviceQueryResults.map((result) => result.data)
  const { filteredData: filteredServices, setSearchQuery, setTaxonomyFilters, taxonomyFilters } = useFilters(
    isLoadingServices ? [] : (baseServices as Service[]),
    ['name', 'description'],
    'needFocus'
  )

  return {
    isLoading: isLoadingCollection || isLoadingServices,
    collection,
    visibleServices: filteredServices,
    numServices: baseServices.length,
    setSearchQuery,
    defaultMapCenter: { lat: 40.73061, lng: -73.935242 }, // NYC lat, lng
    setTaxonomyFilters,
    taxonomyFilters
  }
}
