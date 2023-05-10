import { Button, Center, Flex, Heading, Stack } from '@chakra-ui/react'
import { Drawer, Input, Textarea } from 'components'
import { useCreateListContext, useHookFormProps } from 'hooks'
import { CreateListItem } from './CreateListItem'

export const CreateListDrawer = (): JSX.Element => {
  const {
    isDrawerOpen,
    onDrawerClose,
    selectedServices,
    form,
    onSubmit,
    isCreatingServicesList,
  } = useCreateListContext()

  const { formState } = form
  const { isValid } = formState

  const createListItems: JSX.Element[] = []
  for (const [serviceId, service] of selectedServices) {
    createListItems.push(<CreateListItem key={serviceId} service={service} />)
  }

  return (
    <Drawer
      id="createListDrawer"
      isOpen={isDrawerOpen}
      onClose={onDrawerClose}
      size="lg"
    >
      <Flex as="form" direction="column" onSubmit={onSubmit} minH="100%">
        <Heading mb="32px">Your resource list</Heading>
        <Flex direction="column" flexGrow={1} mb="32px">
          <Stack spacing="16px" mb="32px">
            <Input
              isRequired
              id="name"
              label="List name"
              {...useHookFormProps('name', form)}
            />
            <Input
              isRequired
              id="creator"
              label="Creator"
              {...useHookFormProps('creator', form)}
            />
            <Textarea
              isRequired
              id="description"
              label="Description"
              {...useHookFormProps('description', form)}
            />
          </Stack>
          {createListItems.length > 0 ? (
            <Stack spacing="16px">{createListItems}</Stack>
          ) : (
            <Center flexGrow={1}>
              Add at least one resource to your list.
            </Center>
          )}
        </Flex>
        <Stack direction={{ base: 'column', sm: 'row' }} spacing="16px">
          <Button onClick={onDrawerClose}>Add more resources</Button>
          <Button
            type="submit"
            isDisabled={!isValid || createListItems.length === 0}
            isLoading={isCreatingServicesList}
          >
            Submit
          </Button>
        </Stack>
      </Flex>
    </Drawer>
  )
}
