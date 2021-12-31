import {
  Input,
  InputLeftElement,
  InputGroup,
  InputGroupProps,
} from '@chakra-ui/react'
import { useState, KeyboardEvent } from 'react'
import { SearchIcon } from './Icons'

interface SearchBarProps extends InputGroupProps {
  handleSearch: (query: string) => void
}

export const SearchBar = ({
  handleSearch,
  ...props
}: SearchBarProps): JSX.Element => {
  const [query, setQuery] = useState('')

  const onEnter = (event: KeyboardEvent<HTMLInputElement>)  => {
    if (event.key === 'Enter') {
      handleSearch(query)
    }
  }

  return (
    <InputGroup {...props}>
      <InputLeftElement
        pointerEvents="none"
        children={<SearchIcon />}
      />
      <Input
        onChange={e => setQuery(e.target.value)}
        onKeyDown={e => onEnter(e)}
      />
    </InputGroup>
  )
}
