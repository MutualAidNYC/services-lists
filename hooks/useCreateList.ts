import { createContext, useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { createServicesLists, getAllServices } from 'api'
import { Service, ServicesList } from 'models'

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

  /* TODO Replace this with correct create call */
  var testList = <ServicesList>{}
  // testList.id - This field is computer by airtable
  testList.name = "Queens Food Resource List"
  testList.description = "List for the food resources in or near Queens."
  testList.Services = ["recM3Q4kaWcsETMPU", "recLyZ0RWwlpvALOP", "recN4JW8eaGvJ1iF2"]
  //testList.ServicesNames - This field is computer by airtable
  //testList.taxonomies - This field is computer by airtable
  testList.creator = "neo"
  //testList.createdAt - This field is computer by airtable
  createServicesLists([testList], false)
  /* End of temp call */

  return {
    isLoading: isLoadingServices,
    baseServices: baseServices ?? [],
    services: services ?? [],
    setServices,
  }
}
