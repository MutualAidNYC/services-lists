import { getAllNeeds } from 'api'
import { Need } from 'models'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { useDeepCompareMemo } from 'use-deep-compare'

export interface FiltersHandler<T> {
  isLoading: boolean
  filteredData: T[]
  setSearchQuery: (query: string) => void
  taxonomyOptions: { value: string; label: string }[]
  setTaxonomyFilters: (filters: string[]) => void
}

export const useFilters = <T>(
  baseData: T[],
  searchFields: (keyof T)[],
  taxonomyField: keyof T
): FiltersHandler<T> => {
  const { isLoading, data: taxonomyTerms } = useQuery<Need[], Error>(
    ['taxonomies'],
    () => getAllNeeds("AND(Need != '-Not Listed',Resources)"),
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  )
  const taxonomyOptions = taxonomyTerms?.map((term) => {
    return { value: term.Need, label: term.Need }
  })

  const [searchQuery, setSearchQuery] = useState('')
  const [taxonomyFilters, setTaxonomyFilters] = useState<string[]>([])

  const filteredData = useDeepCompareMemo(() => {
    let filteredData = baseData
    if (searchQuery != '') {
      const searchFilterFunction = (datum: T) =>
        searchFields.some((field) =>
          (datum[field] as unknown as string)
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase())
        )

      filteredData = filteredData.filter((datum) => searchFilterFunction(datum))
    }
    if (taxonomyFilters.length > 0) {
      const taxonomyFilterFunction = (datum: T) =>
        (datum[taxonomyField] as unknown as string[])?.some((taxonomy) =>
          taxonomyFilters.includes(taxonomy)
        )

      filteredData = filteredData.filter((datum) =>
        taxonomyFilterFunction(datum)
      )
    }

    return filteredData
  }, [baseData, searchQuery, taxonomyFilters])

  return {
    isLoading,
    filteredData,
    setSearchQuery,
    taxonomyOptions: taxonomyOptions ?? [],
    setTaxonomyFilters,
  }
}
