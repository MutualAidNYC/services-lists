import { Button, Center, Flex, IconButton, Stack, Text } from '@chakra-ui/react'
import { Input, Modal, Textarea } from 'components'
import { ResourceField, useCreateCollectionReturn } from 'hooks'
import { Minus } from 'react-feather'
import { getHookFormProps } from 'utils'
import { useAuth } from './Auth'

const CreateCollectionResource = ({
  resource,
  duplicateResourceId,
  removeResource,
}: {
  resource: ResourceField
  duplicateResourceId?: string
  removeResource: () => void
}): JSX.Element => {
  return (
    <Flex alignItems="center" justifyContent="space-between">
      <Flex alignItems="start" direction="column">
        <Text>{resource.title}</Text>
        {resource.id === duplicateResourceId && (
          <Text fontSize="subtitle" color="red">
            You&apos;ve already added this resource
          </Text>
        )}
      </Flex>
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

  const { authUser, onModalOpen: onAuthModalOpen } = useAuth()

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={onModalClose}
      title="Save resources to a collection"
      size={{ base: 'xs', sm: 'md', md: 'xl' }}
    >
      <Stack as="form" onSubmit={onSubmit} spacing="32px">
        <Stack spacing="16px">
          <Text fontSize="subtitle">
            <Text as="span" color="red">
              *
            </Text>
            Required field
          </Text>
          <Input
            isRequired
            id="name"
            label="Collection name"
            helperText="Ex: Queens Housing Resources"
            {...getHookFormProps('name', form)}
          />
          <Input
            isRequired
            id="creator"
            label="Creator name"
            helperText="Ex: John Smith"
            {...getHookFormProps('creator', form)}
          />
          <Textarea
            isRequired
            id="description"
            label="Description"
            helperText="Ex: Housing Resources for residents seeking housing support or assistance in the Queens Borough."
            {...getHookFormProps('description', form)}
          />
        </Stack>
        {collectionResources.length > 0 ? (
          <Stack spacing="16px">
            {collectionResources.map((resource, i) => (
              <CreateCollectionResource
                key={resource.key}
                resource={resource}
                duplicateResourceId={duplicateResourceId}
                removeResource={() => removeResource(i)}
              />
            ))}
          </Stack>
        ) : (
          <Center>Save at least one resource to your collection.</Center>
        )}
        {!authUser && (
          <Text>
            You must{' '}
            <Text as="span" variant="clickable" onClick={onAuthModalOpen}>
              create an account or login
            </Text>{' '}
            before creating an collection.
          </Text>
        )}
        <Stack direction={{ base: 'column', sm: 'row' }} spacing="16px">
          <Button
            type="submit"
            isDisabled={!(isValid && Boolean(authUser))}
            isLoading={isCreatingCollection}
          >
            Create collection
          </Button>
          <Button onClick={onModalClose}>Close</Button>
        </Stack>
      </Stack>
    </Modal>
  )
}
