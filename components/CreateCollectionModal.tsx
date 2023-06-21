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
  duplicateResourceMessage,
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
      <Flex as="form" direction="column" onSubmit={onSubmit} minH="100%">
        {duplicateResourceMessage && (
          <Center flexGrow={1}>
            Save at least one resource to your collection.
          </Center>
        )}
        {!duplicateResourceMessage && (
          <Flex direction="column" flexGrow={1} mb="32px">
            <Stack spacing="16px" mb="32px">
              <Input
                isRequired
                id="name"
                label="Collection name"
                {...getHookFormProps('name', form)}
              />
              <Input
                isRequired
                id="creator"
                label="Creator"
                {...getHookFormProps('creator', form)}
              />
              <Textarea
                isRequired
                id="description"
                label="Description"
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
              <Center flexGrow={1}>
                Save at least one resource to your collection.
              </Center>
            )}
          </Flex>
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
      </Flex>
    </Modal>
  )
}
