import { Heading, Stack } from '@chakra-ui/react'
import { NextPage } from 'next'
import { SearchBar, ServiceItem, SortMenu } from '../components'
import { useCreateList } from '../hooks'

export const CreateListPage: NextPage = () => {
  const { baseServices, services, setServices } = useCreateList()
  const sortFieldsTextToVal = {Name: 'name', Description: 'description'}

  return (
    <>
      <Heading fontSize="heading1" mb="36px">Create a resource list</Heading>
      <SearchBar data={baseServices} setData={setServices} searchFields={['name', 'description']} mb="16px" />
      <SortMenu data={services} setData={setServices} sortFieldsTextToVal={sortFieldsTextToVal} mb="36px" />
      <Stack spacing="36px">
        {services.map(service => (
          <ServiceItem key={service.id} service={service} />
        ))}
      </Stack>
    </>
  )
}

export default CreateListPage
