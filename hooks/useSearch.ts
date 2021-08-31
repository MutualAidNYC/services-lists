import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react'

export interface SearchHandler<T> {
  filters: string[],
  setFilter: Dispatch<SetStateAction<string>>,
  handleSearch: (query: string) => void
}

const SearchContext = createContext<SearchHandler<any>>({} as SearchHandler<any>)
export const useSearchContext = (): SearchHandler<any> => useContext(SearchContext)
export const SearchProvider = SearchContext.Provider

export const useSearch = <T>(
  data: T[],
  setData: Dispatch<SetStateAction<T[]>>,
  searchFunctions: Record<string, (query: string, data: T[]) => T[]>,
): SearchHandler<T> => {
  const filters = Object.keys(searchFunctions)
  const [selectedFilter, setFilter] = useState(filters[0])

  const handleSearch = (query: string) => {
    if (query === '') {
      setData(data)
      return
    }

    const updatedData = searchFunctions[selectedFilter](query, data)
    console.log(updatedData)
    setData(updatedData)
  }

  return {
    filters,
    setFilter,
    handleSearch,
  }
}
