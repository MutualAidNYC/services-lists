import { Dispatch, SetStateAction } from 'react'

interface SearchHandler {
  handleSearch: (query: string) => void
}

export const useSearch = <T>(
  baseData: T[],
  searchFields: string[], // must be fields that map to string values
  setData: Dispatch<SetStateAction<T[]>>,
): SearchHandler => {
  const handleSearch = (query: string): void => {
    if (query === '') {
      setData(baseData)
      return
    }

    setData(baseData.filter(
      datum => searchFields.some(field => (datum[field as keyof T] as unknown as string).toLowerCase().includes(query.toLowerCase()))
    ))
  }

  return {
    handleSearch,
  }
}
