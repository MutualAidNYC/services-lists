import { ChevronDownIcon } from '@chakra-ui/icons'
import {
  Button,
  Menu,
  MenuButton,
  MenuButtonProps,
  MenuDivider,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
} from '@chakra-ui/react'
import { SortOrder, useSortContext } from 'hooks'

interface SortMenuProps extends MenuButtonProps {
  sortFieldsTextToVal: Record<string, string>
}

export const SortMenu = ({
  sortFieldsTextToVal,
  ...props
}: SortMenuProps): JSX.Element => {
  const { setOrder, setSortField } = useSortContext()

  return (
    <Menu>
      <MenuButton
        as={Button}
        {...props}
        variant="outline"
        borderRadius="16"
        fontWeight="normal"
        color="gray.600"
        borderColor="gray.400"
      >
        Sort by <ChevronDownIcon />{' '}
      </MenuButton>
      <MenuList zIndex={2}>
        <MenuOptionGroup
          title="Order"
          type="radio"
          defaultValue="asc"
          onChange={(e) => setOrder(e as SortOrder)}
        >
          <MenuItemOption value="asc">Ascending</MenuItemOption>
          <MenuItemOption value="desc">Descending</MenuItemOption>
        </MenuOptionGroup>
        <MenuDivider />
        <MenuOptionGroup
          title="Sort by"
          type="radio"
          onChange={(e) => setSortField(e)}
        >
          {Object.keys(sortFieldsTextToVal).map((text, i) => (
            <MenuItemOption key={i} value={sortFieldsTextToVal[text]}>
              {text}
            </MenuItemOption>
          ))}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  )
}
