export const range = ({
  start,
  end,
}: {
  start: number
  end: number
}): number[] => Array.from({ length: end - start + 1 }, (_, i) => start + i)
