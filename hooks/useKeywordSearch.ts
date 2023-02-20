import Fuse from 'fuse.js'
import { useState } from 'react'

export const useKeywordSearch = <T>(keys: Fuse.FuseOptionKey<T>[]) => {
  const [keyword, setKeyword] = useState<string>()

  const search = (data: T[]) => {
    // Return data if there is no keyword
    if (!keyword) {
      return data
    }

    const fuse = new Fuse(data, { keys })
    return fuse.search(keyword).map((result) => result.item)
  }

  return {
    setKeyword,
    search,
  }
}
