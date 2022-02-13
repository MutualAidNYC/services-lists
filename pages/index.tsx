import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import {
  Heading,
  HStack,
  Stack,
  Box,
  VStack,
  Text,
} from '@chakra-ui/react'
import { SearchBar, ServicesListItem, SortMenu } from 'components'
import { useAllServicesLists, useTaxonomyFilter } from 'hooks'
import { ServicesList } from 'models'
import { useState } from 'react'
import { PaginatedList } from 'react-paginated-list'


import Select from 'react-select'

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

  const [maxAmountDisplayed, setMaxAmountDisplayed] = useState(10)

  const displayAmountOptions = [
    { value: 5, label: '5' },
    { value: 10, label: '10' },
    { value: 25, label: '25' },
    { value: 50, label: '50' },
    { value: 100, label: '100' },
    { value: servicesLists.length, label: 'All' }
  ]



  return (
    <Box w='100%' mb={8} display='flex' flexDirection='column'>
      <VStack w='100%' mb={8} alignItems='left' pl={{ base: 4, sm: 16, md: 32 }} >
        <Heading fontSize={{ base: '4xl', sm: '5xl' }} mt={8}>Services Lists</Heading>
        <SearchBar baseData={baseServicesLists} setData={setServicesLists} searchFields={['name', 'description']} w={{ base: '100%', sm: '60%' }} mb='24px' />
        <HStack spacing="24px" w='100%' mb="24px" mt={2} >
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

          <Box >
            <Select
              isSearchable
              closeMenuOnSelect={true}
              placeholder={`Amount`}
              options={displayAmountOptions}
              onChange={(e) => { e ? setMaxAmountDisplayed(e.value) : null }}
              theme={(theme) => ({
                ...theme,
                borderRadius: 16,
              })}
            />
          </Box>

        </HStack>
      </VStack>


      <Box>
        <PaginatedList
          list={servicesLists}
          useMinimalControls={true}
          itemsPerPage={maxAmountDisplayed}
          renderList={(list) => (
            <>
              {
                list.map((item, i) => {
                  return (
                    <Stack alignItems='left' key={i} w='100%' maxW='6xl' pl={{ base: 4, sm: 16, md: 32 }} >
                      <ServicesListItem
                        pr={{ base: '2px', sm: '8px' }}
                        w='100%'
                        _hover={{ base: {}, md: { background: '#fafafa', borderRadius: '24px' } }}
                        key={item.name}
                        servicesList={item}
                      />
                    </Stack>
                  )
                })
              }
              <Text textAlign='center' fontWeight='bold' > {list.length == 1 ? ` ${list.length} result loaded.` : ` ${list.length} results loaded.`}  </Text>
            </>
          )}
        />
      </Box>

    </Box>

  )
}

