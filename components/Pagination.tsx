import { Button, HStack } from '@chakra-ui/react'
import { ELLIPSIS, UsePaginationReturn } from 'hooks'
import { ArrowLeft, ArrowRight, MoreHorizontal } from 'react-feather'

const PageButton = ({
  page,
  isCurrentPage,
  setPage,
}: {
  page: number | typeof ELLIPSIS
  isCurrentPage: boolean
  setPage: (page: number) => void
}): JSX.Element => {
  if (page === ELLIPSIS) {
    return <MoreHorizontal />
  }

  return (
    <Button
      onClick={() => setPage(page)}
      variant={isCurrentPage ? 'outline' : 'ghost'}
    >
      {page}
    </Button>
  )
}

export const Pagination = ({
  page: currentPage,
  setPage,
  range,
  hasPrevious,
  hasNext,
  previous,
  next,
}: Omit<
  UsePaginationReturn,
  'pageSize' | 'setPageSize' | 'lastPage'
>): JSX.Element => {
  return (
    <HStack justifyContent="space-between">
      <Button
        isDisabled={!hasPrevious}
        onClick={previous}
        leftIcon={<ArrowLeft />}
        variant="ghost"
      >
        Previous
      </Button>
      <HStack>
        {range.map((page, i) => (
          <PageButton
            key={i}
            page={page}
            isCurrentPage={page === currentPage}
            setPage={setPage}
          />
        ))}
      </HStack>
      <Button
        isDisabled={!hasNext}
        onClick={next}
        rightIcon={<ArrowRight />}
        variant="ghost"
      >
        Next
      </Button>
    </HStack>
  )
}
