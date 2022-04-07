import { Box, BoxProps, Heading, Link, Stack, Text } from '@chakra-ui/react'
import { TaxonomySection } from 'components'
import { ServicesList } from 'models'
import { formatDate } from 'utils'

interface ServicesListItemProps extends BoxProps {
  servicesList: ServicesList
}

export const ServicesListItem = ({
  servicesList,
  ...props
}: ServicesListItemProps): JSX.Element => {
  // Airtable taxonomies field contains duplicates
  const taxonomies = [...new Set(servicesList?.taxonomies)]

  return (
    <Box {...props}>
      <Heading fontSize="subheading2" mb="16px">
        <Link href={`/list/${servicesList.id}`}>{servicesList.name}</Link>
      </Heading>
      <Stack spacing="8px">
        <Text>{servicesList.description}</Text>
        <Text>{`Created by ${servicesList.creator} on ${formatDate(
          servicesList.createdAt
        )}`}</Text>
        <TaxonomySection taxonomies={taxonomies} />
      </Stack>
    </Box>
  )
}
