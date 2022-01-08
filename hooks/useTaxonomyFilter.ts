import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { getAllTaxonomies } from '../api'
import { TaxonomyTerm } from '../models'

interface TaxonomyFilterHandler{
  isLoading: boolean
  taxonomyOptions: { value: string; label: string }[]
  setFilters: (filters: string[]) => void
}

export const useTaxonomyFilter = <T>(
  baseData: T[],
  setData: (data: T[]) => void,
  filterFunction: (datum: T, filters: string[]) => boolean,
): TaxonomyFilterHandler => {
  const {
    isLoading,
    data: taxonomyTerms,
  } = useQuery<TaxonomyTerm[], Error>(
    ['taxonomies'],
    () => getAllTaxonomies('NOT({services} = BLANK())'),
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  )
  const taxonomyOptions = taxonomyTerms
    ?.filter(term => term.term !== '-Not Listed')
    ?.map(term => {
      return { value: term.term, label: term.term }
    })
  
  const [filters, setFilters] = useState<string[]>([])
  useEffect(() => {
    if (filters.length === 0) {
      setData(baseData)
      return
    }

    setData(baseData.filter(datum => filterFunction(datum, filters)))
  }, [filters])

  return {
    isLoading,
    taxonomyOptions: taxonomyOptions ?? [],
    setFilters,
  }
}
