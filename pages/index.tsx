import { Heading, HStack, Stack, Text } from '@chakra-ui/react'
import {
  PaginationSection,
  SearchBar,
  ServicesListItem,
  SortMenu,
} from 'components'
import { PaginationProvider, SortProvider, useAllServicesLists } from 'hooks'
import { NextPage } from 'next'
import Head from 'next/head'
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
      <Head>
        <title>Resource Lists</title>
        <meta
          name="description"
          content={
            'A directory of lists of resources available for New Yorkers.'
          }
        />
        <meta name="image" content="/manyc_logo.png" />
        <link rel="icon" href="/icon.ico" />
      </Head>
      <Stack spacing="16px">
        <Heading fontSize={{ base: '32px', md: '48px' }}>
          Resource lists
        </Heading>
        <Text fontSize={{ base: '16px', md: '24px' }}>
          Where you can view curated lists of resources or create your own!
        </Text>
      </Stack>
      <Stack spacing="16px">
        <Stack
          direction={{ base: 'column', md: 'row' }}
          align={{ base: undefined, md: 'center' }}
          spacing="16px"
          justify="space-between"
        >
          <SearchBar
            handleSearch={setSearchQuery}
            placeholder="Search resource lists"
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
