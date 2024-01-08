import { Box, Heading, HStack, Link, Stack, Text } from '@chakra-ui/react'
import { Collection } from 'models'
import React from 'react'
import { formatDate } from 'utils'
import { ShareLink } from './ShareLink'

interface CollectionItemProps {
  collection: Collection
}

const CollectionItem = ({
  collection,
  ...props
}: CollectionItemProps): JSX.Element => {
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
          <Link href={`list/${collection.id}`}>{collection.name}</Link>
        </Heading>
        {/* TODO on click should let you edit the list and other actions */}
        <ShareLink
          url={`${window.location.origin}/list/${collection.id}`}
          title={collection.name}
          text={collection.description}
        />
      </HStack>
      <Stack spacing="8px">
        <Text>{collection.description}</Text>
        <Text>{`Created by ${collection.creator} on ${formatDate(
          collection.createdTime
        )}`}</Text>
      </Stack>
    </Box>
  )
}

export default CollectionItem
