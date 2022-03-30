import { createContext, useContext, useState } from 'react'
import { useDeepCompareMemo } from 'use-deep-compare'

export type SortOrder = 'asc' | 'desc'

export interface SortHandler<T> {
  sortedData: T[]
  setOrder: (order: SortOrder) => void
  setSortField: (sortFields: string | string[]) => void
}

const SortContext = createContext({} as SortHandler<any>) // eslint-disable-line @typescript-eslint/no-explicit-any
export const SortProvider = SortContext.Provider
export const useSortContext = <T>(): SortHandler<T> => useContext(SortContext)

export const useSort = <T>(data: T[]): SortHandler<T> => {
  const [order, setOrder] = useState<SortOrder>('asc')
  const [sortField, setSortField] = useState<string | string[]>('')

  const sortedData = useDeepCompareMemo(() => {
    const sortedData = [...data]

    if (order == 'asc') {
      sortedData.sort((a, b) =>
        a[sortField as keyof T] > b[sortField as keyof T] ? 1 : -1
      )
    } else {
      sortedData.sort((a, b) =>
        a[sortField as keyof T] < b[sortField as keyof T] ? 1 : -1
      )
    }

    return sortedData
  }, [data, sortField, order])

  return {
    sortedData,
    setOrder,
    setSortField,
  }
}
