import { useMemo } from "react"
import { useQuery } from "react-query"
import { Column } from "react-table"
import { getServicesLists } from "../api"
import { ServicesList } from "../models"

export interface ServicesListsHandler {
  servicesListsData: object[]
  servicesListsColumns: Column[]
  isLoading: boolean
}

export const useServicesListsHandler = (): ServicesListsHandler => {
  const { 
    isLoading,
    isError,
    data,
  } = useQuery<ServicesList[], Error>("servicesLists", () => getServicesLists("Status='Published'"))

  const servicesListsColumns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "Name"
      },
      {
        Header: "Services",
        accessor: "Services"
      },
      {
        Header: "Owner",
        accessor: "Owner"
      },
    ], 
    []
  )

  const servicesListsData = useMemo(() => data, [data])

  return {
    servicesListsData,
    servicesListsColumns,
    isLoading,
  }
}
