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
} from '@chakra-ui/react'
import { SearchBar, ServicesListItem } from '../components'
import { ServicesListsProvider, useAllServicesLists } from '../hooks'

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
      <Heading fontSize='heading1' mb='36px'>Services Lists</Heading>
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
        <Menu closeOnSelect={false}>
          <MenuButton as={Button}>Filter by</MenuButton>
          <MenuList>
            <MenuOptionGroup type="checkbox" onChange={e => setFilters(e)}>
              {taxonomies.map((taxonomy, i) => 
                <MenuItemOption value={taxonomy} key={i}>
                  {taxonomy}
                </MenuItemOption>
              )}
            </MenuOptionGroup>
          </MenuList>
        </Menu>
      </HStack>
      <Stack spacing='36px'>
        {servicesLists.map(servicesList => 
          <ServicesListItem
            key={servicesList.name}
            servicesList={servicesList}
          />
        )}
      </Stack>
    </ServicesListsProvider>
  )
}
