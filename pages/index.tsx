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
  VStack,
} from '@chakra-ui/react'
import { SearchBar, ServicesListItem } from '../components'
import { ServicesListsProvider, useAllServicesLists } from '../hooks'
import Select from 'react-select'
import { ChevronDownIcon } from '@chakra-ui/icons'

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
    <Box w='100%' mb={16} display='flex' flexDirection='column'>
      <ServicesListsProvider value={allServicesListsHandler} >
        <Heading fontSize='5xl' textAlign={{ base: 'center', md: 'center' }} mt={8}>Services Lists</Heading>
        <VStack w='100%' mb={8} alignItems='center' >
          <SearchBar handleSearch={handleSearch} w='90%' />
          <HStack spacing="24px" w='100%' mb="24px" mt={2} justifyContent={'right'} pr={'8%'}>
            <Menu closeOnSelect={false} >
              <MenuButton as={Button} variant='outline' borderRadius='16' fontWeight='normal' color='gray.600' borderColor='gray.400'>Sort by <ChevronDownIcon /> </MenuButton>
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

            <Box >
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
        </VStack>
        <Stack spacing='36px' alignItems='left' pl={{ base: 4, sm: 16, md: 32 }} >
          {servicesLists?.map(servicesList =>
            <ServicesListItem
              // _hover={{base: {}, md: { border: '1px', borderRadius: '8' }}}
              // px={{base: 0, md: 2}}
              key={servicesList.name}
              servicesList={servicesList}
            />
          )}
        </Stack>

      </ServicesListsProvider>
    </Box>
  )
}
