import { Stack } from '@chakra-ui/react'
import { useAllServicesListsContext } from '../../hooks'
import { ServicesListItem } from './ServicesListItem'

export const ServicesLists = (): JSX.Element => {
  const { servicesLists } = useAllServicesListsContext()

  return (
    <Stack spacing='36px'>
      {servicesLists?.map(servicesList => 
        <ServicesListItem
          key={servicesList.name}
          servicesList={servicesList}
        />
      )}
    </Stack>
  )
}
