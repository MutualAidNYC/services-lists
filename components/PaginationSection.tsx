import { Flex, FlexProps, HStack, Text } from '@chakra-ui/react'
import { usePaginationContext } from 'hooks'

interface PaginationSectionProps extends FlexProps {
  baseDataLength: number
}

export const PaginationSection = ({
  baseDataLength,
  ...props
}: PaginationSectionProps): JSX.Element => {
  const { paginatedData, page, numPages, setPage } = usePaginationContext()

  const pageElements: JSX.Element[] = []
  for (let i = 1; i <= numPages; i++) {
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
        <Text fontWeight="bold">Page</Text>
        {pageElements}
      </HStack>
    </Flex>
  )
}
