import { Heading, Stack } from '@chakra-ui/react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { ServiceItem } from '../../components'
import { ServiceListProvider, useServiceList } from '../../hooks'

export const ListPage: NextPage = () => {
  const router = useRouter()
  const serviceListHandler = useServiceList(router.query.listId as string)
  const { isLoading, listName, services } = serviceListHandler

  return (
    <ServiceListProvider value={serviceListHandler}>
      <Heading mb="36px">{listName}</Heading>
      <Stack spacing="36px">
        {!isLoading && services?.map(service =>
          <ServiceItem
            key={service.id}
            service={service}
          />
        )}
      </Stack>
    </ServiceListProvider>
  )
}

export default ListPage
