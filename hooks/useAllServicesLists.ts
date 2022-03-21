import { createContext, useContext } from 'react'
import { useQuery } from 'react-query'
import { getAllServicesLists } from 'api'
import { ServicesList } from 'models'
import {
  PaginationHandler,
  SortHandler,
  useFilters,
  usePagination,
  useSort,
} from 'hooks'

interface AllServicesListsHandler {
  isLoading: boolean
  visibleServicesLists: ServicesList[]
  numServicesLists: number
  setSearchQuery: (query: string) => void
  taxonomyOptions: { value: string; label: string }[]
  setTaxonomyFilters: (filters: string[]) => void
  sortHandler: SortHandler<ServicesList>
  paginationHandler: PaginationHandler<ServicesList>
}

const AllServicesListContext = createContext<AllServicesListsHandler>(
  {} as AllServicesListsHandler
)
export const ServicesListsProvider = AllServicesListContext.Provider
export const useAllServicesListsContext = (): AllServicesListsHandler =>
  useContext(AllServicesListContext)

export const useAllServicesLists = (): AllServicesListsHandler => {
  const { isLoading: isLoadingAllServicesLists, data: baseServicesLists } =
    useQuery<ServicesList[], Error>(
      ['allServicesLists'],
      () => getAllServicesLists("{Status} = 'Published'"),
      {
        retry: false,
        refetchOnWindowFocus: false,
      }
    )

  const {
    isLoading: isLoadingFilters,
    filteredData: filteredServicesLists,
    setSearchQuery,
    taxonomyOptions,
    setTaxonomyFilters,
  } = useFilters(baseServicesLists ?? [], ['name', 'description'], 'taxonomies')
  const sortHandler = useSort(filteredServicesLists)
  const paginationHandler = usePagination(sortHandler.sortedData)

  return {
    isLoading: isLoadingAllServicesLists || isLoadingFilters,
    visibleServicesLists: paginationHandler.paginatedData,
    numServicesLists: baseServicesLists?.length ?? 0,
    setSearchQuery,
    taxonomyOptions,
    setTaxonomyFilters,
    sortHandler,
    paginationHandler,
  }
}
