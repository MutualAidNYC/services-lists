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
import { useEffect, useState } from 'react'

interface SortMenuProps<T> extends MenuButtonProps {
  data: T[]
  setData: (data: T[]) => void
  sortFieldsTextToVal: Record<string, string>
}

export const SortMenu = <T,>({
  data,
  setData,
  sortFieldsTextToVal,
  ...props
}: SortMenuProps<T>): JSX.Element => {
  const [order, setOrder] = useState<string | string[]>('asc')
  const [sortFields, setSortFields] = useState<string | string[]>([])

  useEffect(() => {
    if (sortFields.length === 0) {
      return
    }

    const sortFieldsArray =
      typeof sortFields === 'string' ? [sortFields] : sortFields
    if (order === 'asc') {
      const sortedData = [...data]
      sortFieldsArray.forEach((field) =>
        sortedData.sort((a, b) =>
          a[field as keyof T] > b[field as keyof T] ? 1 : -1
        )
      )
      setData(sortedData)
    } else {
      const sortedData = [...data]
      sortFieldsArray.forEach((field) =>
        sortedData.sort((a, b) =>
          a[field as keyof T] < b[field as keyof T] ? 1 : -1
        )
      )
      setData(sortedData)
    }
  }, [order, sortFields, data, setData])

  return (
    <Menu isLazy closeOnSelect={false}>
      <MenuButton as={Button} {...props}>
        Sort by
      </MenuButton>
      <MenuList w="fit-content">
        <MenuOptionGroup
          title="Order"
          type="radio"
          defaultValue="asc"
          onChange={(e) => setOrder(e)}
        >
          <MenuItemOption value="asc">Ascending</MenuItemOption>
          <MenuItemOption value="desc">Descending</MenuItemOption>
        </MenuOptionGroup>
        <MenuDivider />
        <MenuOptionGroup
          title="Sort by"
          type="checkbox"
          onChange={(e) => setSortFields(e)}
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
