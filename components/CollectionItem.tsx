import { Box, Heading, HStack, Link, Stack, Text } from '@chakra-ui/react'
import { ServicesList } from 'models'
import React from 'react'
import { formatDate } from 'utils'
import { ShareLink } from './ShareLink'
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
      border="1px solid #EAECF0"
      borderRadius="8px"
      boxShadow="0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)"
      rounded="lg"
      p={{ base: 4, md: 8 }}
      _hover={{ boxShadow: 'lg' }}
    >
      <HStack justifyContent={'space-between'} w="100%">
        <Heading fontSize="subheading2" mb="16px">
          <Link href={`list/${servicesList.id}`}>{servicesList.name}</Link>
        </Heading>
        {/* TODO on click should let you edit the list and other actions */}
        <ShareLink
          resourceURL={`${window.location.origin}/list/${servicesList.id}`}
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

export default CollectionItem
