import { act, renderHook } from '@testing-library/react'
import { useFilters } from 'hooks'
import { createUseQueryWrapper } from '../useQueryWrapper'

interface TestDatum {
  field1: string
  field2: string
  field3: string
  taxonomy: string[]
}

const testData: TestDatum[] = [
  {
    field1: 'a',
    field2: '',
    field3: '',
    taxonomy: ['c', 'e'],
  },
  {
    field1: '',
    field2: 'A',
    field3: '',
    taxonomy: ['d'],
  },
  {
    field1: '',
    field2: '',
    field3: 'b',
    taxonomy: ['c'],
  },
]

// useFilters calls useQuery so renderHook has to be called with a wrapper that has a QueryClientProvider
describe('useFilters', () => {
  it('filter by search query, no results', () => {
    const { result } = renderHook(
      () => useFilters(testData, ['field1', 'field2', 'field3'], 'taxonomy'),
      { wrapper: createUseQueryWrapper() }
    )

    act(() => {
      result.current.setSearchQuery('c')
    })

    expect(result.current.filteredData).toEqual([])
  })
  it('filter by search query, one lowercase result', () => {
    const { result } = renderHook(
      () => useFilters(testData, ['field1', 'field2', 'field3'], 'taxonomy'),
      { wrapper: createUseQueryWrapper() }
    )

    act(() => {
      result.current.setSearchQuery('b')
    })

    expect(result.current.filteredData).toEqual([
      {
        field1: '',
        field2: '',
        field3: 'b',
        taxonomy: ['c'],
      },
    ])
  })
  it('filter by search query, one lowercase and one uppercase result', () => {
    const { result } = renderHook(
      () => useFilters(testData, ['field1', 'field2', 'field3'], 'taxonomy'),
      { wrapper: createUseQueryWrapper() }
    )

    act(() => {
      result.current.setSearchQuery('a')
    })

    expect(result.current.filteredData).toEqual([
      {
        field1: 'a',
        field2: '',
        field3: '',
        taxonomy: ['c', 'e'],
      },
      {
        field1: '',
        field2: 'A',
        field3: '',
        taxonomy: ['d'],
      },
    ])
  })
  it('filter by one taxonomy, no results', () => {
    const { result } = renderHook(
      () => useFilters(testData, ['field1', 'field2', 'field3'], 'taxonomy'),
      { wrapper: createUseQueryWrapper() }
    )

    act(() => {
      result.current.setTaxonomyFilters(['a'])
    })

    expect(result.current.filteredData).toEqual([])
  })
  it('filter by one taxonomy, one result with one taxonomy', () => {
    const { result } = renderHook(
      () => useFilters(testData, ['field1', 'field2', 'field3'], 'taxonomy'),
      { wrapper: createUseQueryWrapper() }
    )

    act(() => {
      result.current.setTaxonomyFilters(['d'])
    })

    expect(result.current.filteredData).toEqual([
      {
        field1: '',
        field2: 'A',
        field3: '',
        taxonomy: ['d'],
      },
    ])
  })
  it('filter by one taxonomy, one result with multiple taxonomies', () => {
    const { result } = renderHook(
      () => useFilters(testData, ['field1', 'field2', 'field3'], 'taxonomy'),
      { wrapper: createUseQueryWrapper() }
    )

    act(() => {
      result.current.setTaxonomyFilters(['e'])
    })

    expect(result.current.filteredData).toEqual([
      {
        field1: 'a',
        field2: '',
        field3: '',
        taxonomy: ['c', 'e'],
      },
    ])
  })
  it('filter by one taxonomy, multiple results', () => {
    const { result } = renderHook(
      () => useFilters(testData, ['field1', 'field2', 'field3'], 'taxonomy'),
      { wrapper: createUseQueryWrapper() }
    )

    act(() => {
      result.current.setTaxonomyFilters(['c'])
    })

    expect(result.current.filteredData).toEqual([
      {
        field1: 'a',
        field2: '',
        field3: '',
        taxonomy: ['c', 'e'],
      },
      {
        field1: '',
        field2: '',
        field3: 'b',
        taxonomy: ['c'],
      },
    ])
  })
  it('filter by multiple taxonomies, multiple results', () => {
    const { result } = renderHook(
      () => useFilters(testData, ['field1', 'field2', 'field3'], 'taxonomy'),
      { wrapper: createUseQueryWrapper() }
    )

    act(() => {
      result.current.setTaxonomyFilters(['c', 'd'])
    })

    expect(result.current.filteredData).toEqual([
      {
        field1: 'a',
        field2: '',
        field3: '',
        taxonomy: ['c', 'e'],
      },
      {
        field1: '',
        field2: 'A',
        field3: '',
        taxonomy: ['d'],
      },
      {
        field1: '',
        field2: '',
        field3: 'b',
        taxonomy: ['c'],
      },
    ])
  })
})
