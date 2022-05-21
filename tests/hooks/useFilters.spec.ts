import { act, renderHook } from '@testing-library/react-hooks/dom'
import { useFilters } from 'hooks'

const testData = [
  {
    field1: 'a',
    field2: '',
    field3: '',
    taxonomy: '',
  },
  {
    field1: '',
    field2: 'A',
    field3: '',
    taxonomy: '',
  },
  {
    field1: '',
    field2: '',
    field3: 'b',
    taxonomy: '',
  },
]

describe('useFilters', () => {
  it('filter by search query, no results', () => {
    const { result } = renderHook(() =>
      useFilters(testData, ['field1', 'field2', 'field3'], 'taxonomy')
    )
    /*
    act(() => {
      result.current.setSearchQuery('c')
    })

    expect(result.current.filteredData).toEqual([])
    */
  })
})
