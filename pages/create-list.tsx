import { Heading, HStack, Stack } from '@chakra-ui/react'
import { NextPage } from 'next'
import Select from 'react-select'
import { SearchBar, ServiceItem, SortMenu } from '../components'
import { useCreateList, useTaxonomyFilter } from '../hooks'
import { Service } from '../models'

export const CreateListPage: NextPage = () => {
  const { baseServices, services, setServices } = useCreateList()

  const filterFunction = (service: Service, filters: string[]) =>
    service.taxonomyString?.some(taxonomy => filters.includes(taxonomy)) ?? false
  const { taxonomyOptions, setFilters } = useTaxonomyFilter(baseServices, setServices, filterFunction)

  const sortFieldsTextToVal = {Name: 'name', Description: 'description'}

  return (
    <>
      <Heading fontSize="heading1" mb="36px">Create a resource list</Heading>
      <SearchBar baseData={baseServices} setData={setServices} searchFields={['name', 'description']} mb="16px" />
      <HStack spacing="16px" mb="36px">
        <SortMenu data={services} setData={setServices} sortFieldsTextToVal={sortFieldsTextToVal} />
        <Select
          isMulti
          isSearchable
          instanceId="taxonomy-filter"
          closeMenuOnSelect={false}
          options={taxonomyOptions}
          placeholder="Filter by resource category"
          onChange={e => setFilters(e.map(e => e.value))}
        />
      </HStack>
      <Stack spacing="36px">
        {services.map(service => (
          <ServiceItem key={service.id} service={service} />
        ))}
      </Stack>
    </>
  )
}

export default CreateListPage
