import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useQuery } from 'react-query'
import { getServicesLists } from '../api'
import { ServicesList } from '../models'
import { SearchHandler, useSearch } from './useSearch'

export interface ServicesListsHandler {
  isLoading: boolean
  servicesLists: ServicesList[]
  searchHandler: SearchHandler<ServicesList>
}

const ServicesListContext = createContext<ServicesListsHandler>({} as ServicesListsHandler)
export const ServicesListsProvider = ServicesListContext.Provider
export const useServicesListsContext = (): ServicesListsHandler => useContext(ServicesListContext)

export const useServicesLists = (): ServicesListsHandler => {
  const { isLoading, data: baseServicesLists } = useQuery<ServicesList[], Error>('servicesLists', () => getServicesLists())

  const [servicesLists, setServicesLists] = useState(baseServicesLists)
  useEffect(() => setServicesLists(baseServicesLists), [baseServicesLists])

  const searchFunctions = {
    'Name': (query: string, data: ServicesList[]): ServicesList[] => data.filter(
      service => service.name.toLowerCase().includes(query.toLowerCase())
    ),
    'Description': (query: string, data: ServicesList[]): ServicesList[] => data.filter(
      service => service.description.toLowerCase().includes(query.toLowerCase())
    ),
    'Taxonomy': (query: string, data: ServicesList[]): ServicesList[] => data.filter(
      service => service.taxonomies?.map(taxonomy => taxonomy.toLowerCase())
      .some(taxonomy => taxonomy.includes(query.toLowerCase()))
    ),
  }

  const searchHandler = useSearch(baseServicesLists, setServicesLists, searchFunctions)

  return {
    isLoading,
    servicesLists,
    searchHandler,
  }
}
