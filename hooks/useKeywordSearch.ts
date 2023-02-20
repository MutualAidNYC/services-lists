import Fuse from 'fuse.js'
import { useState } from 'react'

type UseKeywordSearchReturn<T> = {
  setKeyword: (keyword: string) => void
  setData: (data: T[]) => void
  search: () => T[]
}

export const useKeywordSearch = <T>(
  initialData: T[],
  keys: Fuse.FuseOptionKey<T>[]
): UseKeywordSearchReturn<T> => {
  // Can't get data passed into Fuse so need to store in state
  const [data, setData] = useState(initialData)
  const [keyword, setKeyword] = useState<string>()
  const fuse = new Fuse(data, { keys })

  const setDataWrapper = (data: T[]) => {
    setData(data)
    fuse.setCollection(data)
  }

  const search = () => {
    // Return data if there is no keyword
    if (!keyword) {
      return data
    }

    // Map search results to array of type T
    return fuse.search(keyword).map((result) => result.item)
  }

  return {
    setKeyword,
    setData: setDataWrapper,
    search,
  }
}
