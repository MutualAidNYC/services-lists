import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useQuery } from 'react-query'
import { getAllServicesLists, getAllTaxonomies } from '../api'
import { ServicesList, TaxonomyTerm } from '../models'

interface AllServicesListsHandler {
  isLoading: boolean
  baseServicesLists: ServicesList[]
  servicesLists: ServicesList[]
  setServicesLists: (servicesLists: ServicesList[]) => void
  taxonomies: string[]
  setFilters: Dispatch<SetStateAction<string | string[]>>
}

const AllServicesListContext = createContext<AllServicesListsHandler>({} as AllServicesListsHandler)
export const ServicesListsProvider = AllServicesListContext.Provider
export const useAllServicesListsContext = (): AllServicesListsHandler => useContext(AllServicesListContext)

export const useAllServicesLists = (): AllServicesListsHandler => {
  const {
    isLoading: isLoadingAllServicesLists,
    data: baseServicesLists,
  } = useQuery<ServicesList[], Error>(
    ['allServicesLists'],
    () => getAllServicesLists(),
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  )
  const [servicesLists, setServicesLists] = useState(baseServicesLists)
  useEffect(() => setServicesLists(baseServicesLists), [baseServicesLists])

  const {
    isLoading: isLoadingTaxonomies,
    data: taxonomyTerms,
  } = useQuery<TaxonomyTerm[], Error>(
    ['taxonomies'],
    () => getAllTaxonomies('NOT({services} = BLANK())'),
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  )
  const taxonomies = taxonomyTerms
    ?.map(term => term.term)
    ?.filter(term => term !== '-Not Listed')

  const [filters, setFilters] = useState<string | string[]>([])
  useEffect(() => {
    if (filters.length === 0) {
      setServicesLists(baseServicesLists)
      return
    }

    setServicesLists(baseServicesLists?.filter(servicesList =>
      servicesList.taxonomies?.some(taxonomy => filters.includes(taxonomy))
    ))
  }, [baseServicesLists, filters])

  return {
    isLoading: isLoadingAllServicesLists || isLoadingTaxonomies,
    baseServicesLists: baseServicesLists ?? [],
    servicesLists: servicesLists ?? [],
    setServicesLists,
    taxonomies: taxonomies ?? [],
    setFilters,
  }
}
