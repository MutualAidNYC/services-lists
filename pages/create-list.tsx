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
import { CreateListProvider, useCreateList, useTaxonomyFilter } from 'hooks'
import { Service } from 'models'
import { useCallback, useState } from 'react'

export const CreateListPage: NextPage = () => {
  const handler = useCreateList()
  const { baseServices, services, setServices, onAlertOpen, onDrawerOpen } =
    handler

  const filterByTaxonomies = useCallback(
    (service: Service, filters: string[]) =>
      service.taxonomyString?.some((taxonomy) => filters.includes(taxonomy)) ??
      false,
    []
  )
  const { taxonomyOptions, setFilters } = useTaxonomyFilter(
    baseServices,
    setServices,
    filterByTaxonomies
  )

  const sortFieldsTextToVal = { Name: 'name', Description: 'description' }

  const [selectedService, setSelectedService] = useState<Service>()

  return (
    <CreateListProvider value={handler}>
      <Stack spacing="32px">
        <Heading fontSize="heading1">Create a resource list</Heading>
        <Stack spacing="16px">
          <SearchBar
            baseData={baseServices}
            setData={setServices}
            searchFields={['name', 'description']}
          />
          <HStack spacing="16px">
            <SortMenu
              data={services}
              setData={setServices}
              sortFieldsTextToVal={sortFieldsTextToVal}
            />
            <Select
              isMulti
              isSearchable
              instanceId="taxonomySelect"
              closeMenuOnSelect={false}
              options={taxonomyOptions}
              placeholder="Filter by resource category"
              onChange={(e) => setFilters(e.map((e) => e.value))}
            />
          </HStack>
          <Button w="fit-content" onClick={onDrawerOpen}>
            View your list
          </Button>
        </Stack>
        {services.map((service) => (
          <ServiceItem
            key={service.id}
            service={service}
            onAlertOpen={onAlertOpen}
            setSelectedService={setSelectedService}
          />
        ))}
        <CreateListAlert selectedService={selectedService} />
        <CreateListDrawer />
      </Stack>
    </CreateListProvider>
  )
}

export default CreateListPage
