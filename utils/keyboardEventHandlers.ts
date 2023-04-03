import { KeyboardEvent } from 'react'

export const onEnter = <T = Element>({
  event,
  handler,
}: {
  event: KeyboardEvent<T>
  handler: () => void
}) => {
  if (event.key === 'Enter') {
    handler()
  }
}
