import { useState } from 'react'
import { range } from 'utils'

export const usePagination = ({
  totalItems,
  initialPage = 1,
  initialPageSize,
  pagesDisplayed,
}: {
  totalItems: number
  initialPage?: number
  initialPageSize: number
  pagesDisplayed: number
}) => {
  const [page, setPage] = useState(initialPage)
  const [pageSize, setPageSize] = useState(initialPageSize)

  const lastPage = Math.ceil(totalItems / pageSize)

  const hasPrevious = page > 1
  const hasNext = page < lastPage

  const previous = () => {
    if (hasPrevious) {
      setPage(page - 1)
    }
  }

  const next = () => {
    if (hasNext) {
      setPage(page + 1)
    }
  }

  return {
    page,
    setPage,
    pageSize,
    setPageSize,
    lastPage,
    range: getPageRange({ page, lastPage, pagesDisplayed }),
    hasPrevious,
    hasNext,
    previous,
    next,
  }
}

export const ELLIPSIS = '...'

/**
 * Get array of length `pagesDisplayed` of page numbers between `page` and
 * `lastPage`, with ellipses between page numbers indicating pages that aren't
 * visible. The array will always start with `page` and end with `lastPage`.
 */
const getPageRange = ({
  page,
  lastPage,
  pagesDisplayed,
}: {
  page: number
  lastPage: number
  pagesDisplayed: number
}): (number | '...')[] => {
  if (lastPage <= pagesDisplayed) {
    return range({ start: 1, end: lastPage })
  }

  /* Max possible number of pages to the left and right of the current one, not
   * including the first and last pages.
   */
  const maxLeftRange = Math.ceil((pagesDisplayed - 3) / 2)
  const maxRightRange = Math.floor((pagesDisplayed - 3) / 2)

  /* Max possible number of pages to the left of the current one would be
   * beyond the first page.
   */
  if (page - maxLeftRange < 2) {
    // Calculate how many extra pages there are to display on the left side
    const leftOverflow = 2 - (page - maxLeftRange)
    return [
      ...range({ start: 1, end: page + maxRightRange + leftOverflow }),
      ELLIPSIS,
      lastPage,
    ]
  }

  // Analogous case for pages to the right of the current one
  if (page + maxRightRange > lastPage - 1) {
    const rightOverflow = page + maxRightRange - (lastPage - 1)
    return [
      1,
      ELLIPSIS,
      ...range({ start: page - maxLeftRange - rightOverflow, end: lastPage }),
    ]
  }

  return [
    1,
    ELLIPSIS,
    ...range({ start: page - maxLeftRange, end: page + maxRightRange }),
    ELLIPSIS,
    lastPage,
  ]
}
