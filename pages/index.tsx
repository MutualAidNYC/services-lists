import {
  Heading,
  HStack,
  Stack,
  Box,
} from '@chakra-ui/react'
import { SearchBar, ServicesListItem, SortMenu } from '../components'
import { useAllServicesLists } from '../hooks'
import Select from 'react-select'

export default function Home(): JSX.Element { 
  const {
    baseServicesLists,
    servicesLists,
    setServicesLists,
    taxonomies,
    setFilters,
  } = useAllServicesLists()
  const sortFieldsTextToVal = {Name: 'name', Description: 'description'}

  return (
    <>
      <Heading fontSize='heading1' mb='36px'>Resource Lists</Heading>
      <SearchBar data={baseServicesLists} setData={setServicesLists} searchFields={['name', 'description']} w='66%' mb='24px' />
      <HStack spacing="24px" mb="24px">
        <SortMenu data={servicesLists} setData={setServicesLists} sortFieldsTextToVal={sortFieldsTextToVal} />
        <Box width='20vw'>
          <Select
            isMulti
            isSearchable
            autoFocus
            closeMenuOnSelect={false}
            placeholder="Filter By"
            options={taxonomies.map((taxonomy) => ({ value: taxonomy, label: taxonomy }))}
            onChange={(e) => { setFilters(e.map((e) => e.value)) }}
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
            key={servicesList.name}
            servicesList={servicesList}
          />
        )}
      </Stack>

    </>
  )
}
