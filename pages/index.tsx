import {
  Heading,
  HStack,
  Stack,
  Box,
} from '@chakra-ui/react'
import { SearchBar, ServicesListItem, SortMenu } from 'components'
import { useAllServicesLists, useTaxonomyFilter } from 'hooks'
import Select from 'react-select'
import { ServicesList } from 'models'
import { NextPage } from 'next'

export const HomePage: NextPage = () => { 
  const {
    baseServicesLists,
    servicesLists,
    setServicesLists,
  } = useAllServicesLists()

  const filterFunction = (servicesList: ServicesList, filters: string[]) =>
    servicesList.taxonomies?.some(taxonomy => filters.includes(taxonomy)) ?? false
  const { taxonomyOptions, setFilters } = useTaxonomyFilter(baseServicesLists, setServicesLists, filterFunction)

  const sortFieldsTextToVal = {Name: 'name', Description: 'description'}

  return (
    <>
      <Heading fontSize='heading1' mb='36px'>Resource Lists</Heading>
      <SearchBar baseData={baseServicesLists} setData={setServicesLists} searchFields={['name', 'description']} w='66%' mb='24px' />
      <HStack spacing="24px" mb="24px">
        <SortMenu data={servicesLists} setData={setServicesLists} sortFieldsTextToVal={sortFieldsTextToVal} />
        <Box width='20vw'>
          <Select
            isMulti
            isSearchable
            closeMenuOnSelect={false}
            placeholder="Filter By"
            options={taxonomyOptions}
            onChange={e => { setFilters(e.map((e) => e.value)) }}
            theme={(theme) => ({
              ...theme,
              borderRadius: 16,
              colors: {
                ...theme.colors,
                primary25: '#B2DFDB',
                primary: 'black',
              },
            })}
          />
        </Box>
      </HStack>
      <Stack spacing='36px'>
        {servicesLists.map(servicesList =>
          <ServicesListItem
            key={servicesList.id}
            servicesList={servicesList}
          />
        )}
      </Stack>

    </>
  )
}

export default HomePage
