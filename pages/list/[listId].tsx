import { Heading, Stack, Box } from '@chakra-ui/react'
import decimal2sexagesimalNext from 'geolib/es/decimalToSexagesimal'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Map, ServiceItem } from '../../components'
import { ServiceListProvider, useServiceList } from '../../hooks'


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
      <Heading mb="36px" textAlign='center' size='3xl'>{listName}</Heading>
      <Stack direction='row' >
        <Stack spacing="36px" boxSize='3xl' maxHeight='70vh' overflowY='scroll' css={{
          '&::-webkit-scrollbar': {
            width: '4px',
          },
          '&::-webkit-scrollbar-track': {
            width: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'grey',
            borderRadius: '24px',
          },
        }}>
          {!isLoading && services.map(service =>
            <ServiceItem
              key={service.id}
              service={service}
            />
          )}
        </Stack>

        <Box boxSize={'lg'} pl='4' pr='4' pt='4' alignSelf={'center'}>
          <Map
            defaultCenter={defaultMapCenter}
            addressIdToLabel={addressIdToServiceName}
            addresses={addresses}
          />
        </Box>

      </Stack>
    </ServiceListProvider>

  )
}

export default ListPage
