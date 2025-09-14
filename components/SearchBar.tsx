import {
  Input,
  InputGroup,
  InputGroupProps,
  InputLeftElement,
} from '@chakra-ui/react'
import { KeyboardEvent, useState } from 'react'
import { Search } from 'react-feather'

interface SearchBarProps extends InputGroupProps {
  handleSearch: (query: string) => void
  placeholder?: string
}

export const SearchBar = ({
  handleSearch,
  placeholder,
  ...props
}: SearchBarProps): JSX.Element => {
  const [query, setQuery] = useState('')

  const onEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch(query)
    }
  }

  return (
    <InputGroup {...props}>
      <InputLeftElement pointerEvents="none">
        <Search color="#667085" />
      </InputLeftElement>
      <Input
        placeholder={placeholder}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => onEnter(e)}
      />
    </InputGroup>
  )
}
