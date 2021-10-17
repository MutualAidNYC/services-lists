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

export interface ServicesListsHandler {
  isLoading: boolean
  servicesLists: ServicesList[]
  handleSearch: (query: string) => void
  order: string | string[]
  sortFieldsTextToVal: Record<string, string>
  setOrder: Dispatch<SetStateAction<string | string[]>>
  setSortFields: Dispatch<SetStateAction<string | string[]>>
  taxonomies: string[]
  setFilters: Dispatch<SetStateAction<string | string[]>>
}

const ServicesListContext = createContext<ServicesListsHandler>({} as ServicesListsHandler)
export const ServicesListsProvider = ServicesListContext.Provider
export const useServicesListsContext = (): ServicesListsHandler => useContext(ServicesListContext)

export const useServicesLists = (): ServicesListsHandler => {
  const {
    isLoading: isLoadingServicesLists,
    data: baseServicesLists,
  } = useQuery<ServicesList[], Error>(
    ['servicesLists'],
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

  const handleSearch = (query: string): void => {
    if (query === '') {
      setServicesLists(baseServicesLists)
      return
    }

    setServicesLists(baseServicesLists?.filter(servicesList => (
      servicesList.name.toLowerCase().includes(query.toLowerCase())) ||
      servicesList.description.toLowerCase().includes(query.toLowerCase())
    ))
  }

  const [order, setOrder] = useState<string | string[]>('asc')
  const sortFieldsTextToVal: Record<string, string> = {
    Name: 'name',
    Description: 'description',
  }
  const [sortFields, setSortFields] = useState<string | string[]>([])
  useEffect(() => {
    if (sortFields.length === 0) {
      return
    }

    const sortFieldsArray = typeof sortFields === 'string' ? [sortFields] : sortFields
    if (order === 'asc') {
      const sortedServicesLists = [...servicesLists]
      sortFieldsArray.forEach(field => sortedServicesLists.sort((a, b) => a[field] > b[field] ? 1 : -1))
      console.log('sortedServicesLists', sortedServicesLists)
      setServicesLists(sortedServicesLists)
    }
    else if (order === 'desc') {
      const sortedServicesLists = [...servicesLists]
      sortFieldsArray.forEach(field => sortedServicesLists.sort((a, b) => a[field] < b[field] ? 1 : -1))
      console.log('sortedServicesLists', sortedServicesLists)
      setServicesLists(sortedServicesLists)
    }
  }, [servicesLists, order, sortFields])

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
    isLoading: isLoadingServicesLists || isLoadingTaxonomies,
    servicesLists,
    handleSearch,
    order,
    sortFieldsTextToVal,
    setOrder,
    setSortFields,
    taxonomies,
    setFilters,
  }
}
