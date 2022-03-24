import { Button, Flex, Heading, HStack, Stack, Text } from '@chakra-ui/react'
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
  const { pageSizeOptions, setPageSize } = paginationHandler

  const sortFieldsTextToVal = { Name: 'name', Description: 'description' }

  const [selectedService, setSelectedService] = useState<Service>()

  return (
    <Stack spacing="32px" px="96px" py="48px">
      <Flex align="center" justify="space-between">
        <Heading fontSize="heading1">Create a resource list</Heading>
        <Button w="fit-content" onClick={onDrawerOpen}>
          View your list
        </Button>
      </Flex>
      <Flex justify="space-between">
        <SearchBar
          handleSearch={setSearchQuery}
          placeholder={'Search resources'}
          w="60%"
        />
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
        <PaginationSection baseDataLength={numServices} />
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
