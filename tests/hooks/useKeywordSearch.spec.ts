import { act, renderHook } from '@testing-library/react-hooks/dom'
import { useKeywordSearch } from 'hooks'

type TestDatum = {
  field1: string
  field2: string
}

const testData: TestDatum[] = [
  {
    field1: 'foo',
    field2: 'bar',
  },
  {
    field1: 'bar',
    field2: 'baz',
  },
  {
    field1: 'qux',
    field2: 'quux',
  },
]

describe('useKeywordSearch', () => {
  it('Exact match, one key, one result', () => {
    const { result } = renderHook(() =>
      useKeywordSearch<TestDatum>(testData, ['field1'])
    )

    act(() => result.current.setKeyword('foo'))
    const searchData = result.current.search()

    expect(searchData?.length).toBe(1)
    expect(searchData).toStrictEqual([
      {
        field1: 'foo',
        field2: 'bar',
      },
    ])
  })

  it('Exact match, multiple keys, multiple result', () => {
    const { result } = renderHook(() =>
      useKeywordSearch(testData, ['field1', 'field2'])
    )

    act(() => result.current.setKeyword('bar'))
    const searchData = result.current.search()

    expect(searchData?.length).toBe(2)
    expect(searchData).toEqual(
      expect.arrayContaining([
        {
          field1: 'foo',
          field2: 'bar',
        },
        {
          field1: 'bar',
          field2: 'baz',
        },
      ])
    )
  })

  it('Fuzzy match, one key, one result', () => {
    const { result } = renderHook(() => useKeywordSearch(testData, ['field1']))

    act(() => result.current.setKeyword('fo'))
    const searchData = result.current.search()

    expect(searchData?.length).toBe(1)
    expect(searchData).toStrictEqual([
      {
        field1: 'foo',
        field2: 'bar',
      },
    ])
  })

  it('Multiple keys, no results', () => {
    const { result } = renderHook(() =>
      useKeywordSearch(testData, ['field1', 'field2'])
    )

    act(() => result.current.setKeyword('c'))
    const searchData = result.current.search()

    expect(searchData?.length).toBe(0)
  })

  it('No keyword, one key, returns input data after updating data from empty array', () => {
    const { result } = renderHook(() =>
      useKeywordSearch<TestDatum>([], ['field1'])
    )

    act(() => result.current.setData(testData))
    const searchData = result.current.search()

    expect(searchData?.length).toBe(3)
    expect(searchData).toStrictEqual(testData)
  })
})
