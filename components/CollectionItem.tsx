import { Box, Heading, HStack, Link, Stack, Text } from '@chakra-ui/react'
import { ServicesList } from 'models'
import React from 'react'
import { MoreVertical } from 'react-feather'
import { formatDate } from 'utils'
import { TaxonomySection } from './TaxonomySection'

interface CollectionItemProps {
  servicesList: ServicesList
}

const CollectionItem = ({
  servicesList,
  ...props
}: CollectionItemProps): JSX.Element => {
  const taxonomies = [...new Set(servicesList?.taxonomies)]

  return (
    <Box
      {...props}
      boxShadow="md"
      rounded="lg"
      p="8"
      _hover={{ boxShadow: 'lg' }}
    >
      <HStack justifyContent={'space-between'} w="100%">
        <Heading fontSize="subheading2" mb="16px">
          <Link href={`list/${servicesList.id}`}>{servicesList.name}</Link>
        </Heading>
        {/* TODO on click should let you edit the list */}
        <MoreVertical cursor={'pointer'} />
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

export default CollectionItem
