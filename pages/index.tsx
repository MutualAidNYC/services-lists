import { Heading, HStack, Stack, Box, VStack, Text } from '@chakra-ui/react'
import { SearchBar, ServicesListItem, SortMenu } from 'components'
import { useAllServicesLists, useTaxonomyFilter } from 'hooks'
import { ServicesList } from 'models'
import { NextPage } from 'next'
import { useState } from 'react'
import Select from 'react-select'
import { PaginatedList } from 'react-paginated-list'

export const HomePage: NextPage = () => {
  const { baseServicesLists, servicesLists, setServicesLists } =
    useAllServicesLists()

  const filterFunction = (servicesList: ServicesList, filters: string[]) =>
    servicesList.taxonomies?.some((taxonomy) => filters.includes(taxonomy)) ??
    false
  const { taxonomyOptions, setFilters } = useTaxonomyFilter(
    baseServicesLists,
    setServicesLists,
    filterFunction
  )

  const sortFieldsTextToVal = { Name: 'name', Description: 'description' }

  const [maxAmountDisplayed, setMaxAmountDisplayed] = useState(10)

  const displayAmountOptions = [
    { value: 5, label: '5' },
    { value: 10, label: '10' },
    { value: 25, label: '25' },
    { value: 50, label: '50' },
    { value: 100, label: '100' },
    { value: servicesLists.length, label: 'All' },
  ]

  return (
    <Box w="100%" mb={8} display="flex" flexDirection="column">
      <VStack
        w="100%"
        mb={8}
        alignItems="left"
        pl={{ base: 4, sm: 16, md: 32 }}
      >
        <Heading fontSize={{ base: '4xl', sm: '5xl' }} mt={8} mb={4}>
          Services Lists
        </Heading>

        <Stack w="100%" direction={'row'} justifyContent="space-between">
          <SearchBar
            baseData={baseServicesLists}
            setData={setServicesLists}
            searchFields={['name', 'description']}
            w={{ base: '100%', sm: '60%' }}
            mb="24px"
          />
          <Box
            display="flex"
            flex-flexDirection="row"
            justifyContent="center"
            alignItems="center"
            pr={16}
          >
            <Text textAlign="center" px={2}>
              {' '}
              Results per page
            </Text>
            <Select
              isSearchable
              closeMenuOnSelect={true}
              placeholder={`${maxAmountDisplayed}`}
              options={displayAmountOptions}
              onChange={(e) => {
                e ? setMaxAmountDisplayed(e.value) : null
              }}
              theme={(theme) => ({
                ...theme,
                borderRadius: 16,
              })}
            />
          </Box>
        </Stack>

        <HStack spacing="24px" w="100%" mb="24px" mt={2}>
          <SortMenu
            data={servicesLists}
            setData={setServicesLists}
            sortFieldsTextToVal={sortFieldsTextToVal}
          />

          <Box>
            <Select
              isMulti
              isSearchable
              closeMenuOnSelect={false}
              placeholder="Filter By"
              options={taxonomyOptions}
              onChange={(e) => {
                setFilters(e.map((e) => e.value))
              }}
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

      <Box>
        <PaginatedList
          list={servicesLists}
          useMinimalControls={true}
          itemsPerPage={maxAmountDisplayed}
          renderList={(list) => (
            <>
              {list.map((item, i) => {
                return (
                  <Stack
                    alignItems="left"
                    key={i}
                    w="100%"
                    maxW="4xl"
                    pl={{ base: 4, sm: 16, md: 32 }}
                  >
                    <ServicesListItem
                      pr={{ base: '2px', sm: '8px' }}
                      w="100%"
                      _hover={{
                        base: {},
                        md: { background: '#fafafa', borderRadius: '24px' },
                      }}
                      key={item.name}
                      servicesList={item}
                    />
                  </Stack>
                )
              })}
              <Text textAlign="center" fontWeight="light">
                {' '}
                {list.length == 1
                  ? ` Showing ${list.length} out of ${servicesLists.length} results.`
                  : ` Showing ${list.length} out of ${servicesLists.length} results.`}{' '}
              </Text>
              {/* <HStack justifyContent='center' w='100%' cursor='pointer' onClick={() => {maxAmountDisplayed + maxAmountDisplayed > servicesLists.length? setMaxAmountDisplayed(servicesLists.length) : setMaxAmountDisplayed(maxAmountDisplayed + 1 )}}>
                <Text fontWeight='bold'> Load more</Text>
                <ChevronDownIcon />
              </HStack> */}
            </>
          )}
        />
      </Box>
    </Box>
  )
}

export default HomePage
