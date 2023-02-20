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

    return fuse.search(keyword).map((result) => result.item)
  }

  return {
    setKeyword,
    setData: setDataWrapper,
    search,
  }
}
