import { Button, Heading, HStack, Stack } from '@chakra-ui/react'
import { NextPage } from 'next'
import Select from 'react-select'
import {
  SearchBar,
  ServiceItem,
  SortMenu,
  CreateListAlert,
  CreateListDrawer,
} from 'components'
import { CreateListProvider, SortProvider, useCreateList } from 'hooks'
import { Service } from 'models'
import { useState } from 'react'

export const CreateListPage: NextPage = () => {
  const createListHandler = useCreateList()
  const {
    visibleServices,
    setSearchQuery,
    taxonomyOptions,
    setTaxonomyFilters,
    sortHandler,
    onAlertOpen,
    onDrawerOpen,
  } = createListHandler

  const sortFieldsTextToVal = { Name: 'name', Description: 'description' }

  const [selectedService, setSelectedService] = useState<Service>()

  return (
    <Stack spacing="32px" px="96px" py="48px">
      <Heading fontSize="heading1">Create a resource list</Heading>
      <Stack spacing="16px">
        <SearchBar handleSearch={setSearchQuery} />
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
        <Button w="fit-content" onClick={onDrawerOpen}>
          View your list
        </Button>
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
