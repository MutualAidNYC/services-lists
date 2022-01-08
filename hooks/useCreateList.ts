import { createContext, useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { getAllServices } from '../api'
import { Service } from '../models'

interface CreateListHandler {
  isLoading: boolean
  baseServices: Service[]
  services: Service[]
  setServices: (services: Service[]) => void
}

const CreateListContext = createContext<CreateListHandler>({} as CreateListHandler)
export const useCreateListContext = (): CreateListHandler => useContext(CreateListContext)
export const CreateListProvider = CreateListContext.Provider

export const useCreateList = (): CreateListHandler => {
  const {
    isLoading: isLoadingServices,
    data: baseServices,
  } = useQuery<Service[], Error>(
    ['allServices'],
    () => getAllServices(),
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  )
  const [services, setServices] = useState(baseServices)
  useEffect(() => setServices(baseServices), [baseServices])

  return {
    isLoading: isLoadingServices,
    baseServices: baseServices ?? [],
    services: services ?? [],
    setServices,
  }
}
