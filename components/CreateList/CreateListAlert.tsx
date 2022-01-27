import { Button, chakra, Heading, HStack, Stack, Text } from '@chakra-ui/react'
import { Alert } from 'components'
import { useCreateListContext } from 'hooks'
import { Service } from 'models'
import { useRef, useState } from 'react'

interface CreateListAlertProps {
  selectedService?: Service
}

export const CreateListAlert = ({ selectedService }: CreateListAlertProps): JSX.Element => {
  const {
    isAlertOpen,
    onAlertClose,
    onDrawerOpen,
    selectedServices,
    addServiceToList,
  } = useCreateListContext()

  const cancelAlertRef = useRef<HTMLButtonElement>(null)

  const [triedToAddDuplicateService, setTriedToAddDuplicateService] = useState(false)

  const onAlertCloseWrapper = (): void => {
    onAlertClose()
    setTriedToAddDuplicateService(false)
  }

  const addResource = (): void => {
    if (!selectedService) {
      return
    }

    if (!selectedServices.has(selectedService.id)) {
      addServiceToList(selectedService)
      onAlertClose()
      onDrawerOpen()
    } else {
      setTriedToAddDuplicateService(true)
      cancelAlertRef.current?.focus()
    }
  }

  return (
    <Alert
      id="createListAlert"
      isOpen={isAlertOpen}
      onClose={onAlertCloseWrapper}
      leastDestructiveRef={cancelAlertRef}
    >
      <Stack spacing="16px">
        <Heading fontSize="subheading1">
          Add resource
        </Heading>
        {
          triedToAddDuplicateService
          ? (
            <Text>
              <chakra.span fontWeight="semibold">{`"${selectedService?.name ?? 'This resource'}"`}</chakra.span>{' '}
              is already in your list.
            </Text>
          )
          : (
            <Text>
              Are you sure you want to add{' '}
              <chakra.span fontWeight="semibold">{`"${selectedService?.name ?? 'this'}"`}</chakra.span>{' '}
              to your resource list?
            </Text>
          )
        }
        <HStack>
          <Button onClick={onAlertCloseWrapper} ref={cancelAlertRef}>
            Cancel
          </Button>
          {!triedToAddDuplicateService && (
            <Button onClick={addResource}>
              Add
            </Button>
          )}
        </HStack>
      </Stack>
    </Alert>
  )
}
