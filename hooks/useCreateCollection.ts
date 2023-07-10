import { useDisclosure } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { createServicesLists } from 'apiFunctions'
import { CreateServicesListRequest, Resource } from 'models'
import { Collection } from 'models/collections'
import { useRouter } from 'next/router'
import { useState } from 'react'
import {
  SubmitHandler,
  useFieldArray,
  useForm,
  UseFormReturn,
} from 'react-hook-form'
import { array, object, string } from 'yup'

export type ResourceField = { id: string; title: string }

type CreateCollectionForm = Pick<
  Collection,
  'name' | 'creator' | 'description'
> & { resources: ResourceField[] }

const fieldRequiredMessage = 'Cannot be blank'

const schema = object({
  name: string().required(fieldRequiredMessage),
  creator: string().required(fieldRequiredMessage),
  description: string().required(fieldRequiredMessage),
  resources: array().min(1),
})

export type useCreateCollectionReturn = {
  isModalOpen: boolean
  onModalOpen: () => void
  onModalClose: () => void
  saveResource: (resource: Resource) => void
  duplicateResourceId: string
  form: UseFormReturn<CreateCollectionForm, unknown>
  collectionResources: (ResourceField & { key: string })[]
  removeResource: (resourceIndex: number) => void
  onSubmit: () => void
  isCreatingCollection: boolean
}

export const useCreateCollection = (): useCreateCollectionReturn => {
  const form = useForm<CreateCollectionForm>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: {
      resources: [],
    },
  })
  const { fields, append, remove } = useFieldArray({
    name: 'resources',
    control: form.control,
    keyName: 'key',
  })

  const router = useRouter()
  const { mutate: createCollectionMutation, isLoading: isCreatingCollection } =
    useMutation(
      (createServicesListRequests: CreateServicesListRequest[]) =>
        createServicesLists(createServicesListRequests),
      {
        onSuccess: (data) => {
          router.push(`/list/${data[0].id}`)
        },
      }
    )

  const onValidSubmit: SubmitHandler<CreateCollectionForm> = (data) => {
    createCollectionMutation([
      {
        // Set status to "Draft" b/c research team has to approve new collections
        status: 'Draft',
        name: data.name,
        description: data.description,
        creator: data.creator,
        resources: data.resources.map((resource) => resource.id),
      },
    ])
  }
  const onSubmit = form.handleSubmit(onValidSubmit)

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [duplicateResourceId, setDuplicateResourceId] = useState('')

  const saveResource = (resource: Resource) => {
    // Check if saved resource is already in the form
    if (
      form.getValues('resources').filter((r) => r.id === resource.id).length > 0
    ) {
      setDuplicateResourceId(resource.id)
    } else {
      setDuplicateResourceId('')
      append({ id: resource.id, title: resource.title })
    }

    onOpen()
  }

  const onCloseWrapper = () => {
    onClose()
    // Clear duplicate on modal close
    setDuplicateResourceId('')
  }

  return {
    isModalOpen: isOpen,
    onModalOpen: onOpen,
    onModalClose: onCloseWrapper,
    saveResource,
    duplicateResourceId,
    form,
    collectionResources: fields,
    removeResource: remove,
    onSubmit,
    isCreatingCollection,
  }
}
