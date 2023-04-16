import {
  Button,
  ButtonGroup,
  Spinner,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { getServicesList } from 'api'
import { ServicesList } from 'models'
import { UserDoc } from 'models/users'
import React, { useEffect, useState } from 'react'
import CollectionItem from './CollectionItem'

interface CollectionProps {
  userData: UserDoc
}

export const Collections = ({ userData }: CollectionProps): JSX.Element => {
  const [loading, setLoading] = useState(true)
  const [listData, setListData] = useState<ServicesList[]>([])

  useEffect(() => {
    const promises = []
    for (const list of userData.lists) {
      const listData = getServicesList(list)
      promises.push(listData)
    }

    Promise.all(promises.map((p) => p.catch((e) => e))).then((list) => {
      setListData(list)
      setLoading(false)
    })
  }, [userData])

  if (loading) {
    return (
      <Stack w="100%" alignItems={'center'}>
        <Spinner
          mt={16}
          mb={8}
          boxSize="75px"
          color="teal"
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
        />
      </Stack>
    )
  }

  return (
    <VStack alignItems="left" w="100%" spacing={4}>
      <ButtonGroup variant={'ghost'}>
        <Button as="a" href="">
          Create New Collection
        </Button>
        {/* Using a Button Group in case we want to follow the current designs completely */}
      </ButtonGroup>

      {listData.map((list) => {
        if (!(list instanceof Error)) {
          return <CollectionItem key={list.id} servicesList={list} />
        }
      })}

      {listData.length === 0 && !loading && (
        // TODO: Add a button to create a new collection & make this look better
        <Text> You have no collections </Text>
      )}
    </VStack>
  )
}
