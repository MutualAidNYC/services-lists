import { createContext, useContext, useEffect, useState } from 'react'
import { useDeepCompareMemo } from 'use-deep-compare'

const pageSizes = [5, 10, 25, 50, 100]

export interface PaginationHandler<T> {
  paginatedData: T[]
  page: number
  numPages: number
  setPage: (page: number) => void
  pageSizeOptions: { value: number; label: string }[]
  setPageSize: (pageSize: number) => void
}

const PaginationContext = createContext({} as PaginationHandler<any>)
export const PaginationProvider = PaginationContext.Provider
export const usePaginationContext = <T>(): PaginationHandler<T> =>
  useContext(PaginationContext)

export const usePagination = <T>(data: T[]): PaginationHandler<T> => {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(pageSizes[0])

  useEffect(() => {
    if (pageSize === data.length) setPage(1)
  }, [pageSize, data.length])

  const paginatedData = useDeepCompareMemo(() => {
    return pageSize === data.length
      ? data
      : data.slice((page - 1) * pageSize, page * pageSize)
  }, [data, page, pageSize])

  const pageSizeOptions = useDeepCompareMemo(() => {
    const pageSizeOptions: { value: number; label: string }[] = []
    pageSizes.forEach((size) => {
      if (size < data.length) {
        pageSizeOptions.push({ value: size, label: size.toString() })
      }
    })
    pageSizeOptions.push({ value: data.length, label: 'All' })

    return pageSizeOptions
  }, [data.length])

  return {
    paginatedData,
    page,
    numPages: Math.ceil(data.length / pageSize),
    setPage,
    setPageSize,
    pageSizeOptions,
  }
}
