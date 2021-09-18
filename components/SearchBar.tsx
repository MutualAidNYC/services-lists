import {
  Flex,
  Input,
  InputLeftElement,
  InputGroup,
  InputGroupProps,
  Select,
} from '@chakra-ui/react'
import { useState, KeyboardEvent } from 'react'
import { SearchIcon } from './Icons'
import { useSearchContext } from '../hooks'

export const SearchBar = ({...props}: InputGroupProps): JSX.Element => {
  const {
    filters,
    setFilter,
    handleSearch,
  } = useSearchContext()

  const [query, setQuery] = useState('')
  const onEnter = (event: KeyboardEvent<HTMLInputElement>)  => {
    if (event.key === 'Enter') {
      handleSearch(query)
    }
  }

  return (
    <Flex>
      <InputGroup {...props}>
        <InputLeftElement
          pointerEvents='none'
          children={<SearchIcon />}
        />
        <Input
          onChange={event => setQuery(event.target.value)}
          onKeyDown={event => onEnter(event)}
        />
      </InputGroup>
      {filters.length > 1 && (
        <Select onChange={event => setFilter(event.target.value)}>
          {filters.map(filter => (
            <option key={filter}>
              {filter}
            </option>
          ))}
        </Select>
      )}
    </Flex>
  )
}
