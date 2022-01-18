import {
  Heading,
  HStack,
  Stack,
  Box,
  VStack,
} from '@chakra-ui/react'
import { SearchBar, ServicesListItem, SortMenu } from 'components'
import { useAllServicesLists, useTaxonomyFilter } from 'hooks'
import Select from 'react-select'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { ServicesList } from 'models'

export default function Home(): JSX.Element {
  const {
    baseServicesLists,
    servicesLists,
    setServicesLists,
  } = useAllServicesLists()

  const filterFunction = (servicesList: ServicesList, filters: string[]) =>
    servicesList.taxonomies?.some(taxonomy => filters.includes(taxonomy)) ?? false
  const { taxonomyOptions, setFilters } = useTaxonomyFilter(baseServicesLists, setServicesLists, filterFunction)

  const sortFieldsTextToVal = { Name: 'name', Description: 'description' }

  return (
    <Box w='100%' mb={16} display='flex' flexDirection='column'>

      <Heading fontSize='5xl' textAlign={{ base: 'center', md: 'center' }} mt={8}>Services Lists</Heading>
      <VStack w='100%' mb={8} alignItems='center' >
        <SearchBar baseData={baseServicesLists} setData={setServicesLists} searchFields={['name', 'description']} w='66%' mb='24px' />
        <HStack spacing="24px" w='100%' mb="24px" mt={2} justifyContent={'right'} pr={'8%'}>
          <SortMenu data={servicesLists} setData={setServicesLists} sortFieldsTextToVal={sortFieldsTextToVal} />

          <Box >
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
      </VStack>
      <Stack spacing='36px' alignItems='left' pl={{ base: 4, sm: 16, md: 32 }} >
        {servicesLists?.map(servicesList =>
          <ServicesListItem
            _hover={{base: {}, md: { border: '1px', borderRadius: '8' }}}
            px={{base: 0, md: 2}}
            key={servicesList.name}
            servicesList={servicesList}
          />
        )}
      </Stack>


    </Box>

  )
}


{/* <>
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
            key={servicesList.name}
            servicesList={servicesList}
          />
        )}
      </Stack>

    </> */}