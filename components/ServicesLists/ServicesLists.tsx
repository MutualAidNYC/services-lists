import { Stack } from '@chakra-ui/react'
import { useServicesListsContext } from '../../hooks'
import { ServicesListItem } from './ServicesListItem'

export const ServicesLists = (): JSX.Element => {
  const { servicesLists } = useServicesListsContext()

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
