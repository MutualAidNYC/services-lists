import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { Flex, FlexProps, HStack, IconButton, Text } from '@chakra-ui/react'
import { usePaginationContext } from 'hooks'

const pageRangeSize = 10
const getPageRange = (currPage: number, numPages: number): [number, number] => {
  if (currPage + pageRangeSize - 1 >= numPages) {
    return [Math.max(1, numPages - pageRangeSize + 1), numPages]
  }

  // Shift start page to current page when current page is over the middle of the range
  const halfPageRangeSize = pageRangeSize / 2
  const startPage =
    currPage % halfPageRangeSize === 1
      ? currPage
      : currPage % halfPageRangeSize === 0
      ? currPage - halfPageRangeSize + 1
      : Math.floor(currPage / halfPageRangeSize) * halfPageRangeSize + 1
  const endPage = Math.min(startPage + 2 * halfPageRangeSize - 1, numPages)

  return [startPage, endPage]
}

interface PaginationSectionProps extends FlexProps {
  baseDataLength: number
}

export const PaginationSection = ({
  baseDataLength,
  ...props
}: PaginationSectionProps): JSX.Element => {
  const { paginatedData, page, numPages, setPage } = usePaginationContext()

  const pageElements: JSX.Element[] = []
  const [startPage, endPage] = getPageRange(page, numPages)
  for (let i = startPage; i <= endPage; i++) {
    pageElements.push(
      <Text
        key={i}
        fontWeight={i === page ? 'bold' : undefined}
        decoration={i === page ? 'underline' : undefined}
        onClick={i === page ? undefined : () => setPage(i)}
        variant={i === page ? undefined : 'clickable'}
      >
        {i}
      </Text>
    )
  }

  return (
    <Flex {...props} justify="space-between">
      <Text>
        Showing {paginatedData.length} of {baseDataLength} results.
      </Text>
      <HStack spacing="12px">
        <IconButton
          display={page === 1 ? 'none' : undefined}
          aria-label="Previous page"
          variant="ghost"
          minW="fit-content"
          h="auto"
          icon={<ChevronLeftIcon />}
          onClick={() => setPage(page - 1)}
        />
        {pageElements}
        <IconButton
          display={page === numPages ? 'none' : undefined}
          aria-label="Next page"
          variant="ghost"
          minW="fit-content"
          h="auto"
          icon={<ChevronRightIcon />}
          onClick={() => setPage(page + 1)}
        />
      </HStack>
    </Flex>
  )
}
