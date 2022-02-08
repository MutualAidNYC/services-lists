import {
  Input,
  InputLeftElement,
  InputGroup,
  InputGroupProps,
} from '@chakra-ui/react'
import { useState, KeyboardEvent } from 'react'
import { SearchIcon } from './Icons'

interface SearchBarProps<T> extends InputGroupProps {
  baseData: T[]
  setData: (data: T[]) => void
  searchFields: string[]
}

export const SearchBar = <T,>({
  baseData,
  setData,
  searchFields,
  ...props
}: SearchBarProps<T>): JSX.Element => {
  const [query, setQuery] = useState('')
  const handleSearch = (query: string): void => {
    if (query === '') {
      setData(baseData)
      return
    }

    setData(
      baseData.filter((datum) =>
        searchFields.some((field) =>
          (datum[field as keyof T] as unknown as string)
            .toLowerCase()
            .includes(query.toLowerCase())
        )
      )
    )
  }

  const onEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch(query)
    }
  }

  return (
    <InputGroup {...props}>
      <InputLeftElement pointerEvents="none">
        <SearchIcon />
      </InputLeftElement>
      <Input
        border="2px"
        borderColor="black"
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => onEnter(e)}
      />
    </InputGroup>
  )
}
