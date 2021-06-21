import React from "react"
import { Table } from "../components"
import { useServicesListsHandler } from "../hooks"

export default function Home(): JSX.Element {
  const {
    servicesListsColumns,
    servicesListsData,
    isLoading,
  } = useServicesListsHandler()

  return (
    <>
      {isLoading && <div>is loading</div>}
      {!isLoading &&
        <Table
          columns={servicesListsColumns}
          data={servicesListsData}
        />
      }
    </>
  )
}
