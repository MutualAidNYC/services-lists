import {
  Button,
  Heading,
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Stack,
  Box,
} from '@chakra-ui/react'
import { SearchBar, ServicesListItem } from '../components'
import { ServicesListsProvider, useAllServicesLists } from '../hooks'
import Select from 'react-select'

export default function Home(): JSX.Element {
  const allServicesListsHandler = useAllServicesLists()
  const {
    servicesLists,
    handleSearch,
    order,
    sortFieldsTextToVal,
    setOrder,
    setSortFields,
    taxonomies,
    setFilters,
  } = allServicesListsHandler

  return (
    <ServicesListsProvider value={allServicesListsHandler}>
      <Heading fontSize='heading1' mb='36px'>Resource Lists</Heading>
      <SearchBar handleSearch={handleSearch} w='66%' mb='24px' />
      <HStack spacing="24px" mb="24px">
        <Menu closeOnSelect={false}>
          <MenuButton as={Button}>Sort by</MenuButton>
          <MenuList>
            <MenuOptionGroup
              title="Order"
              type="radio"
              defaultValue={order}
              onChange={e => setOrder(e)}
            >
              <MenuItemOption value="asc">Ascending</MenuItemOption>
              <MenuItemOption value="desc">Descending</MenuItemOption>
            </MenuOptionGroup>
            <MenuDivider />
            <MenuOptionGroup
              title="Sort by"
              type="checkbox"
              onChange={e => setSortFields(e)}
            >
              {Object.keys(sortFieldsTextToVal).map((text, i) =>
                <MenuItemOption value={sortFieldsTextToVal[text]} key={i}>
                  {text}
                </MenuItemOption>
              )}
            </MenuOptionGroup>
          </MenuList>
        </Menu>
        <Box width='20vw'>
          <Select
            isMulti
            isSearchable
            autoFocus
            closeMenuOnSelect={false}
            placeholder="Filter By"
            options={taxonomies?.map((taxonomy) => ({ value: taxonomy, label: taxonomy }))}
            onChange={(e) => { setFilters(e.map((e) => e.value)) }}
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
      <Stack spacing='36px'>
        {servicesLists?.map(servicesList =>
          <ServicesListItem
            key={servicesList.name}
            servicesList={servicesList}
          />
        )}
      </Stack>

    </ServicesListsProvider>
  )
}
