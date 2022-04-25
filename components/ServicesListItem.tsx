import {
  Box,
  BoxProps,
  Heading,
  HStack,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react'
import { TaxonomySection } from 'components'
import { ServicesList } from 'models'
import { formatDate } from 'utils'
import { ShareLink } from './ShareLink'

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
      <HStack justifyContent={'space-between'} w="100%">
        <Heading fontSize="subheading2" mb="16px">
          <Link href={`/list/${servicesList.id}`}>{servicesList.name}</Link>
        </Heading>
        <ShareLink
          resourceURL={`${window.location.href}/list/${servicesList.id}`}
          title={servicesList.name}
          text={servicesList.description}
        />
      </HStack>
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
