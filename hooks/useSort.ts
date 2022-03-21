import { createContext, useContext, useState } from 'react'
import { useDeepCompareMemo } from 'use-deep-compare'

export type SortOrder = 'asc' | 'desc'

export interface SortHandler<T> {
  sortedData: T[]
  setOrder: (order: SortOrder) => void
  setSortFields: (sortFields: string | string[]) => void
}

const SortContext = createContext({} as SortHandler<any>)
export const SortProvider = SortContext.Provider
export const useSortContext = <T>(): SortHandler<T> => useContext(SortContext)

export const useSort = <T>(data: T[]): SortHandler<T> => {
  const [order, setOrder] = useState<SortOrder>('asc')
  const [sortFields, setSortFields] = useState<string | string[]>([])

  const sortedData = useDeepCompareMemo(() => {
    const sortedData = [...data]
    const sortFieldsArray =
      typeof sortFields === 'string' ? [sortFields] : sortFields

    if (order == 'asc') {
      sortFieldsArray.forEach((field) =>
        sortedData.sort((a, b) =>
          a[field as keyof T] > b[field as keyof T] ? 1 : -1
        )
      )
    } else {
      sortFieldsArray.forEach((field) =>
        sortedData.sort((a, b) =>
          a[field as keyof T] < b[field as keyof T] ? 1 : -1
        )
      )
    }

    return sortedData
  }, [data, sortFields, order])

  return {
    sortedData,
    setOrder,
    setSortFields,
  }
}
