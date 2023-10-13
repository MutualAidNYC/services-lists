import {
  Button,
  ButtonGroup,
  Spinner,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { getServicesList } from 'apiFunctions'
import { UserDocument } from 'models/users'
import React from 'react'
import CollectionItem from './CollectionItem'

interface CollectionProps {
  userData: UserDocument
}

export const Collections = ({ userData }: CollectionProps): JSX.Element => {
  const queryFn = async () => {
    // remove duplicates and create fetch promises
    const promises = userData.lists.map((list) => getServicesList(list))

    // fetch all lists in parallel and remove ones that errored
    const result = (
      await Promise.all<typeof promises>(promises.map((p) => p.catch((e) => e)))
    ).filter((l) => !(l instanceof Error))

    return result
  }

  const { data, isLoading } = useQuery({
    queryKey: ['serviceListsResource', userData.lists],
    queryFn,
  })

  if (isLoading) {
    return (
      <Stack w="100%" alignItems={'center'}>
        <Spinner variant="primary" />
      </Stack>
    )
  }

  return (
    <VStack alignItems="left" w="100%" spacing={4}>
      <ButtonGroup variant={'ghost'}>
        {(data?.length ?? 0) > 0 && (
          <Button as="a" href="/">
            Create New Collection
          </Button>
        )}

        {/* Removing this for now until we have editing a collection set up*/}
        {/* <Button as="a" href="/">
          Edit Collections
        </Button>{' '} */}
      </ButtonGroup>

      {data
        ?.sort(function (a, b) {
          const aVal = a['createdTime'].toLowerCase().replace(/[^0-9a-z]/gi, '')
          const bVal = b['createdTime'].toLowerCase().replace(/[^0-9a-z]/gi, '')
          return aVal <= bVal ? 1 : -1
        })
        .map((list) => (
          <CollectionItem key={list.id} servicesList={list} />
        ))}

      {data?.length === 0 && !isLoading && (
        <VStack>
          <Text>You have no collections</Text>
          <Button variant="ghost" as="a" href="/">
            Create New Collection
          </Button>
        </VStack>
      )}
    </VStack>
  )
}
