import {
  Button,
  Heading,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
} from '@chakra-ui/react'
import { SearchBar, ServicesLists } from '../components'
import { ServicesListsProvider, useServicesLists } from '../hooks'

export default function Home(): JSX.Element {
  const servicesListHandler = useServicesLists()
  const {
    handleSearch,
    order,
    sortFieldsTextToVal,
    setOrder,
    setSortFields,
  } = servicesListHandler

  return (
    <ServicesListsProvider value={servicesListHandler}>
      <Heading fontSize='heading1' mb='36px'>Services Lists</Heading>
      <SearchBar handleSearch={handleSearch} w='66%' mb='24px' />
      <Menu closeOnSelect={false}>
        <MenuButton as={Button} mb='24px'>Sort by</MenuButton>
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
      <ServicesLists />
    </ServicesListsProvider>
  )
}
