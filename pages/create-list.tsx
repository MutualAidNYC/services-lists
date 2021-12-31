import { Heading, Stack } from '@chakra-ui/react'
import { NextPage } from 'next'
import { SearchBar, ServiceItem, SortMenu } from '../components'
import { CreateListProvider, useCreateList } from '../hooks'

export const CreateListPage: NextPage = () => {
  const handler = useCreateList()
  const { services, setServices, handleSearch } = handler
  const sortFieldsTextToVal = {Name: 'name', Description: 'description'}

  return (
    <CreateListProvider value={handler}>
      <Heading fontSize="heading1" mb="36px">Create a resource list</Heading>
      <SearchBar handleSearch={handleSearch} mb="16px" />
      <SortMenu data={services} setData={setServices} sortFieldsTextToVal={sortFieldsTextToVal} mb="36px" />
      <Stack spacing="36px">
        {services.map(service => (
          <ServiceItem key={service.id} service={service} />
        ))}
      </Stack>
    </CreateListProvider>
  )
}

export default CreateListPage
