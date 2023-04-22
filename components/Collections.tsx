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
    if (loading) {
      const promises = []
      for (const list of userData.lists) {
        const listData = getServicesList(list)
        promises.push(listData)
      }

      Promise.all(promises.map((p) => p.catch((e) => e))).then((list) => {
        setListData(list.filter((l) => !(l instanceof Error)))
        setLoading(false)
      })
    }
  }, [loading, userData.lists])

  if (loading) {
    return (
      <Stack w="100%" alignItems={'center'}>
        <Spinner variant="primary" />
      </Stack>
    )
  }

  return (
    <VStack alignItems="left" w="100%" spacing={4}>
      <ButtonGroup variant={'ghost'}>
        <Button as="a" href="/">
          Create New Collection
        </Button>
        <Button as="a" href="/">
          Edit Collections
        </Button>{' '}
      </ButtonGroup>

      {listData.map((list) => (
        <CollectionItem key={list.id} servicesList={list} />
      ))}

      {listData.length === 0 && !loading && (
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
