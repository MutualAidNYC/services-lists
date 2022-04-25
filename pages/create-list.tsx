import { Button, Heading, HStack, Stack, Text } from '@chakra-ui/react'
import { NextPage } from 'next'
import Select from 'react-select'
import {
  SearchBar,
  ServiceItem,
  SortMenu,
  CreateListAlert,
  CreateListDrawer,
  PaginationSection,
} from 'components'
import {
  CreateListProvider,
  PaginationProvider,
  SortProvider,
  useCreateList,
} from 'hooks'
import { Service } from 'models'
import { useState } from 'react'
import Head from 'next/head'

export const CreateListPage: NextPage = () => {
  const createListHandler = useCreateList()
  const {
    visibleServices,
    numServices,
    setSearchQuery,
    taxonomyOptions,
    setTaxonomyFilters,
    paginationHandler,
    sortHandler,
    onAlertOpen,
    onDrawerOpen,
  } = createListHandler
  const { paginatedData } = paginationHandler

  const sortFieldsTextToVal = { Name: 'name', Description: 'description' }

  const [selectedService, setSelectedService] = useState<Service>()

  return (
    <Stack spacing="32px" p={{ base: '48px', md: '64px' }}>
      <Head>
        <title>{'Create A List'}</title>
        <meta
          name="description"
          content={'Create a customized list of resources that you can share.'}
        />
        <meta name="image" content="/manyc_logo.png" />
        <link rel="icon" href="/icon.ico" />
      </Head>
      <Stack
        direction={{ base: 'column', sm: 'row' }}
        align={{ base: undefined, sm: 'center' }}
        spacing="16px"
        justify="space-between"
      >
        <Heading fontSize={{ base: '32px', md: '48px' }}>
          Create a resource list
        </Heading>
        <Button onClick={onDrawerOpen}>View your list</Button>
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
            placeholder={'Search resources'}
            w={{ base: '100%', md: '60%' }}
          />
          <Text>
            Showing {paginatedData.length} of {numServices} results.
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
            options={taxonomyOptions}
            placeholder="Filter by resource category"
            onChange={(e) => setTaxonomyFilters(e.map((e) => e.value))}
          />
        </HStack>
      </Stack>
      {visibleServices.map((service) => (
        <ServiceItem
          key={service.id}
          service={service}
          onAlertOpen={onAlertOpen}
          setSelectedService={setSelectedService}
        />
      ))}
      <CreateListProvider value={createListHandler}>
        <CreateListAlert selectedService={selectedService} />
        <CreateListDrawer />
      </CreateListProvider>
    </Stack>
  )
}

export default CreateListPage
