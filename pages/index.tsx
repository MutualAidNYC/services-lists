import { Heading, HStack, Stack, Text, Flex } from '@chakra-ui/react'
import {
  PaginationSection,
  SearchBar,
  ServicesListItem,
  SortMenu,
} from 'components'
import { PaginationProvider, useAllServicesLists } from 'hooks'
import { NextPage } from 'next'
import Select from 'react-select'

export const HomePage: NextPage = () => {
  const {
    visibleServicesLists,
    numServicesLists,
    setSearchQuery,
    taxonomyOptions,
    setTaxonomyFilters,
    paginationHandler,
  } = useAllServicesLists()
  const { pageSizeOptions, setPageSize } = paginationHandler

  // const sortFieldsTextToVal = { Name: 'name', Description: 'description' }

  return (
    <Stack spacing="32px" px="96px" py="48px">
      <Heading>Resource Lists</Heading>
      <Flex justify="space-between">
        <SearchBar handleSearch={setSearchQuery} w="60%" />
        <HStack>
          <Text>Results per page</Text>
          <Select
            isSearchable
            instanceId="pageSizeSelect"
            closeMenuOnSelect={true}
            options={pageSizeOptions}
            onChange={(e) => {
              e ? setPageSize(e.value) : null
            }}
            theme={(theme) => ({
              ...theme,
              borderRadius: 16,
            })}
          />
        </HStack>
      </Flex>
      <PaginationProvider value={paginationHandler}>
        <PaginationSection baseDataLength={numServicesLists} />
      </PaginationProvider>
      <HStack>
        {/*
        <SortMenu
          data={servicesLists}
          setData={setServicesLists}
          sortFieldsTextToVal={sortFieldsTextToVal}
        />
        */}
        <Select
          isMulti
          isSearchable
          closeMenuOnSelect={false}
          placeholder="Filter By"
          options={taxonomyOptions}
          onChange={(e) => {
            setTaxonomyFilters(e.map((e) => e.value))
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
      </HStack>
      {visibleServicesLists.map((servicesList) => (
        <ServicesListItem
          key={servicesList.id}
          servicesList={servicesList}
          _hover={{
            base: {},
            md: { background: '#fafafa', borderRadius: '24px' },
          }}
        />
      ))}
    </Stack>
  )
}

export default HomePage
