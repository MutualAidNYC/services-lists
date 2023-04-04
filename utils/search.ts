import Fuse from 'fuse.js'

export const fuseSearch = <T>({
  fuse,
  pattern,
}: {
  fuse: Fuse<T>
  pattern?: string | Fuse.Expression
}): T[] => (pattern ? fuse.search(pattern).map((result) => result.item) : [])

export const search = <T>({
  data,
  keys,
  pattern,
}: {
  data: T[]
  keys: string[]
  pattern?: string
}): T[] =>
  pattern ? fuseSearch({ fuse: new Fuse(data, { keys }), pattern }) : data
