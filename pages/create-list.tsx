import { Box, Button, Heading, HStack, Stack, VStack } from '@chakra-ui/react'
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
import { PaginatedList } from 'react-paginated-list'

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

  const [maxAmountDisplayed, setMaxAmountDisplayed] = useState(10)

  const displayAmountOptions = [
    { value: 5, label: '5' },
    { value: 10, label: '10' },
    { value: 25, label: '25' },
    { value: 50, label: '50' },
    { value: 100, label: '100' },
    { value: services.length, label: 'All' },
  ]

  const pageViewStyles = {
    option: (provided: any) => ({
      ...provided,
      minHeight: 36,
    }),
    control: (provided: any) => ({
      ...provided,
      width: '90px',
      borderRadius: '28px',
    }),
    singleValue: (provided: any) => {
      return { ...provided }
    },
  }

  return (
    <CreateListProvider value={handler}>
      <Stack spacing="16px" px={24}>
        <Heading fontSize="heading1" mt={4}>
          Create a resource list
        </Heading>
        <Stack spacing="16px">
          <SearchBar
            baseData={baseServices}
            setData={setServices}
            searchFields={['name', 'description']}
          />
          <HStack justifyContent={'space-between'}>
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
              <Select
                isSearchable
                closeMenuOnSelect={true}
                placeholder={`${maxAmountDisplayed}`}
                options={displayAmountOptions}
                onChange={(e) => {
                  e ? setMaxAmountDisplayed(e.value) : null
                }}
                styles={pageViewStyles}
              />
            </HStack>
            <Button w="fit-content" colorScheme="teal" onClick={onDrawerOpen}>
              View your list
            </Button>
          </HStack>
        </Stack>
        <PaginatedList
          list={services}
          useMinimalControls={true}
          itemsPerPage={maxAmountDisplayed}
          renderList={(list: Service[]) => {
            return (
              <VStack w="100%">
                <>
                  {list.map((service) => (
                    <ServiceItem
                      key={service.id}
                      service={service}
                      onAlertOpen={onAlertOpen}
                      setSelectedService={setSelectedService}
                    />
                  ))}
                  <Box pb={8}> {/* Just for styling purposes */} </Box>
                </>
              </VStack>
            )
          }}
        />
        <CreateListAlert selectedService={selectedService} />
        <CreateListDrawer />
      </Stack>
    </CreateListProvider>
  )
}

export default CreateListPage
