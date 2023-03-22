import { KeyboardEvent } from 'react'

export const onEnter = ({
  event,
  handler,
}: {
  event: KeyboardEvent<HTMLInputElement>
  handler: () => void
}) => {
  if (event.key === 'Enter') {
    handler()
  }
}
