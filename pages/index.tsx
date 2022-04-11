import { Heading, HStack, Stack, Text } from '@chakra-ui/react'
import {
  PaginationSection,
  SearchBar,
  ServicesListItem,
  SortMenu,
} from 'components'
import { PaginationProvider, SortProvider, useAllServicesLists } from 'hooks'
import { NextPage } from 'next'
import Select from 'react-select'

export const HomePage: NextPage = () => {
  const {
    visibleServicesLists,
    numServicesLists,
    setSearchQuery,
    taxonomyOptions,
    setTaxonomyFilters,
    sortHandler,
    paginationHandler,
  } = useAllServicesLists()
  const { paginatedData } = paginationHandler

  const sortFieldsTextToVal = { Name: 'name', Description: 'description' }

  return (
    <Stack spacing="32px" p={{ base: '48px', md: '64px' }}>
      <Heading fontSize={{ base: '32px', md: '48px' }}>Resource lists</Heading>
      <Stack spacing="16px">
        <Stack
          direction={{ base: 'column', md: 'row' }}
          align={{ base: undefined, md: 'center' }}
          spacing="16px"
          justify="space-between"
        >
          <SearchBar
            handleSearch={setSearchQuery}
            placeholder={'Search resources'}
            w={{ base: '100%', md: '60%' }}
          />
          <Text>
            Showing {paginatedData.length} of {numServicesLists} results.
          </Text>
        </Stack>
        <PaginationProvider value={paginationHandler}>
          <PaginationSection />
        </PaginationProvider>
        <HStack spacing="16px">
          <SortProvider value={sortHandler}>
            <SortMenu sortFieldsTextToVal={sortFieldsTextToVal} />
          </SortProvider>
          <Select
            isMulti
            isSearchable
            instanceId="taxonomySelect"
            closeMenuOnSelect={false}
            placeholder="Filter by resource list categories"
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
      </Stack>
      {visibleServicesLists.map((servicesList) => (
        <ServicesListItem
          p={{ base: 2, md: 4 }}
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
