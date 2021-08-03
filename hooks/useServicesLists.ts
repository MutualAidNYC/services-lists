import { useQuery } from "react-query"
import { getServicesLists } from "../api"
import { ServicesList } from "../models"

export interface ServicesListsHandler {
  isLoading: boolean
  servicesLists: ServicesList[]
}

export const useServicesLists = (): ServicesListsHandler => {
  const { 
    isLoading,
    data: servicesLists,
  } = useQuery<ServicesList[], Error>("servicesLists", () => getServicesLists())

  return {
    isLoading,
    servicesLists,
  }
}
