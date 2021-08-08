import { Stack } from '@chakra-ui/react'
import { useServicesLists } from '../../hooks'
import { ServicesListItem } from './ServicesListItem'

export const ServicesLists = (): JSX.Element => {
  const { servicesLists } = useServicesLists()

  return (
    <Stack spacing='36px'>
      {servicesLists?.map((servicesList, i) => <ServicesListItem key={i} servicesList={servicesList} />)}
    </Stack>
  )
}
