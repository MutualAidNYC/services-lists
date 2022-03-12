import { useMemo, useState } from 'react'

const pageSizes = [5, 10, 25, 50, 100]

interface PaginationHandler<T> {
  currentPageData: T[]
  page: number
  setPage: (page: number) => void
  pageSize: number
  setPageSize: (pageSize: number) => void
  pageSizeOptions: {value: number, label: string}[]
}

export const usePagination = <T>(data: T[]): PaginationHandler<T> => {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(Math.min(data.length, pageSizes[0]))

  const currentPageData = useMemo(
    () => data.slice((page - 1) * pageSize, page * pageSize),
    [data, page, pageSize]
  )

  const pageSizeOptions: {value: number, label: string}[]  = []
  pageSizes.forEach((size) => {
    if (size < data.length) {
      pageSizeOptions.push({value: size, label: size.toString()})
    }
  })
  pageSizeOptions.push({value: data.length, label: 'All'})

  return {
    currentPageData,
    page,
    pageSize,
    setPage,
    setPageSize,
    pageSizeOptions,
  }
}
