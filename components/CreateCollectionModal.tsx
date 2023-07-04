import { Button, Center, Flex, IconButton, Stack, Text } from '@chakra-ui/react'
import { Input, Textarea } from 'components'
import { Modal } from 'components/Modal'
import {
  ResourceField,
  useCreateCollectionReturn,
} from 'hooks/useCreateCollection'
import { Minus } from 'react-feather'
import { getHookFormProps } from 'utils/form'

const CreateCollectionResource = ({
  resource,
  removeResource,
}: {
  resource: ResourceField
  removeResource: () => void
}): JSX.Element => {
  return (
    <Flex alignItems="center" justifyContent="space-between">
      <Text>{resource.title}</Text>
      <IconButton
        aria-label="Remove resource from list"
        icon={<Minus />}
        onClick={removeResource}
      />
    </Flex>
  )
}

export const CreateCollectionModal = ({
  isModalOpen,
  onModalClose,
  duplicateResourceId,
  form,
  collectionResources,
  removeResource,
  onSubmit,
  isCreatingCollection,
}: Omit<
  useCreateCollectionReturn,
  'onModalOpen' | 'saveResource'
>): JSX.Element => {
  const { formState } = form
  const { isValid } = formState

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={onModalClose}
      title="Save resources to a collection"
    >
      <Stack as="form" onSubmit={onSubmit} spacing="32px">
        <Stack spacing="16px">
          <Input
            isRequired
            id="name"
            label="Collection name"
            helperText="Ex: Senator Gonzalez's District 59 Resources"
            {...getHookFormProps('name', form)}
          />
          <Input
            isRequired
            id="creator"
            label="Creator name"
            helperText="Ex: Kristen Gonzalez"
            {...getHookFormProps('creator', form)}
          />
          <Textarea
            isRequired
            id="description"
            label="Description"
            helperText="Ex: Mutual aid resources for NY State Senate District 59"
            {...getHookFormProps('description', form)}
          />
        </Stack>
        {collectionResources.length > 0 ? (
          <Stack spacing="16px">
            {collectionResources.map((resource, i) => (
              <CreateCollectionResource
                key={resource.key}
                resource={resource}
                removeResource={() => removeResource(i)}
              />
            ))}
          </Stack>
        ) : (
          <Center>Save at least one resource to your collection.</Center>
        )}
        <Stack direction={{ base: 'column', sm: 'row' }} spacing="16px">
          <Button onClick={onModalClose}>Close</Button>
          <Button
            type="submit"
            isDisabled={!isValid}
            isLoading={isCreatingCollection}
          >
            Create collection
          </Button>
        </Stack>
      </Stack>
    </Modal>
  )
}
