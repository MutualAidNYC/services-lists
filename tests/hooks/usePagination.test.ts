import { act, renderHook } from '@testing-library/react-hooks'
import { ELLIPSIS, usePagination } from 'hooks'

describe('usePagination', () => {
  it('Cannot go back or forward from single page', () => {
    const { result } = renderHook(() =>
      usePagination({
        totalItems: 1,
        initialPageSize: 1,
        pagesDisplayed: 1,
      })
    )

    act(() => result.current.previous())
    expect(result.current.page).toBe(1)

    act(() => result.current.next())
    expect(result.current.page).toBe(1)
  })

  it('Go from first to last page', () => {
    const { result } = renderHook(() =>
      usePagination({
        totalItems: 10,
        initialPageSize: 1,
        pagesDisplayed: 1,
      })
    )

    for (let i = 1; i < 10; i++) {
      act(() => result.current.next())
      expect(result.current.page).toBe(1 + i)
    }

    // Page doesn't change after trying to go next from last page
    act(() => result.current.next())
    expect(result.current.page).toBe(10)
  })

  it('Jump to last page, go back to first', () => {
    const { result } = renderHook(() =>
      usePagination({
        totalItems: 10,
        initialPageSize: 1,
        pagesDisplayed: 1,
      })
    )

    act(() => result.current.setPage(10))

    for (let i = 1; i < 10; i++) {
      act(() => result.current.previous())
      expect(result.current.page).toBe(10 - i)
    }

    // Page doesn't change after trying to go back from first page
    act(() => result.current.previous())
    expect(result.current.page).toBe(1)
  })

  it('Check number of pages given ten items, page size of one', () => {
    const { result } = renderHook(() =>
      usePagination({
        totalItems: 10,
        initialPageSize: 1,
        pagesDisplayed: 1,
      })
    )

    expect(result.current.lastPage).toBe(10)
  })

  it('Check number of pages given ten items, page size of three', () => {
    const { result } = renderHook(() =>
      usePagination({
        totalItems: 10,
        initialPageSize: 3,
        pagesDisplayed: 1,
      })
    )

    expect(result.current.lastPage).toBe(4)
  })

  it('Check page range at first page with six pages displayed, ten total', () => {
    const { result } = renderHook(() =>
      usePagination({
        totalItems: 10,
        initialPageSize: 1,
        pagesDisplayed: 5,
      })
    )

    expect(result.current.range).toStrictEqual([1, 2, 3, 4, ELLIPSIS, 10])
  })

  it('Check page range at last page with five pages displayed, ten total', () => {
    const { result } = renderHook(() =>
      usePagination({
        totalItems: 10,
        initialPage: 10,
        initialPageSize: 1,
        pagesDisplayed: 5,
      })
    )

    expect(result.current.range).toStrictEqual([1, ELLIPSIS, 7, 8, 9, 10])
  })

  it('Check page range at first with six pages displayed, six total', () => {
    const { result } = renderHook(() =>
      usePagination({
        totalItems: 6,
        initialPageSize: 1,
        pagesDisplayed: 6,
      })
    )

    expect(result.current.range).toStrictEqual([1, 2, 3, 4, 5, 6])
  })

  it('Check page range at sixth page with five pages displayed, ten total', () => {
    const { result } = renderHook(() =>
      usePagination({
        totalItems: 10,
        initialPage: 6,
        initialPageSize: 1,
        pagesDisplayed: 6,
      })
    )

    expect(result.current.range).toStrictEqual([
      1,
      ELLIPSIS,
      4,
      5,
      6,
      7,
      ELLIPSIS,
      10,
    ])
  })
})
