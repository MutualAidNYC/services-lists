import { search } from 'utils'

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

describe('search', () => {
  it('Exact match, one key, one result', () => {
    expect(
      search({ data: testData, keys: ['field1'], pattern: 'foo' })
    ).toStrictEqual([
      {
        field1: 'foo',
        field2: 'bar',
      },
    ])
  })

  it('Exact match, multiple keys, multiple result', () => {
    const searchData = search({
      data: testData,
      keys: ['field1', 'field2'],
      pattern: 'bar',
    })

    expect(searchData.length).toBe(2)
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
    expect(
      search({ data: testData, keys: ['field1'], pattern: 'fo' })
    ).toStrictEqual([
      {
        field1: 'foo',
        field2: 'bar',
      },
    ])
  })

  it('Multiple keys, no results', () => {
    expect(
      search({
        data: testData,
        keys: ['field1', 'field2'],
        pattern: 'c',
      }).length
    ).toBe(0)
  })

  it('No keyword, one key, returns input data', () => {
    expect(
      search({ data: testData, keys: ['field1'], pattern: '' })
    ).toStrictEqual(testData)
  })
})
