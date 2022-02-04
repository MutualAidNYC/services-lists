import { Heading, Stack } from '@chakra-ui/react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Map, ServiceItem } from 'components'
import { ServiceListProvider, useServiceList } from 'hooks'

export const ListPage: NextPage = () => {
  const router = useRouter()
  const serviceListHandler = useServiceList(router.query.listId as string)
  const {
    isLoading,
    listName,
    services,
    addressIdToServiceName,
    addresses,
    defaultMapCenter,
  } = serviceListHandler

  return (
    <ServiceListProvider value={serviceListHandler}>
      <Heading mb="36px">{listName}</Heading>
      <Stack spacing="36px" mb="36px">
        {!isLoading &&
          services.map((service) => (
            <ServiceItem key={service.id} service={service} />
          ))}
      </Stack>
      {addresses.length > 0 && (
        <Map
          defaultCenter={defaultMapCenter}
          addressIdToLabel={addressIdToServiceName}
          addresses={addresses}
        />
      )}
    </ServiceListProvider>
  )
}

export default ListPage
