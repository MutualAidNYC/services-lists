import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useQuery } from 'react-query'
import { getAllServicesLists } from '../api'
import { ServicesList } from '../models'

interface AllServicesListsHandler {
  isLoading: boolean
  baseServicesLists: ServicesList[]
  servicesLists: ServicesList[]
  setServicesLists: (servicesLists: ServicesList[]) => void
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

  return {
    isLoading: isLoadingAllServicesLists,
    baseServicesLists: baseServicesLists ?? [],
    servicesLists: servicesLists ?? [],
    setServicesLists,
  }
}
