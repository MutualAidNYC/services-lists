import { useDisclosure } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
<<<<<<< HEAD
import { createServicesLists } from 'apiFunctions'
import { AirtableCreateResponse } from 'database'
=======
import { AirtableCreateResponse, createServicesLists } from 'apiFunctions'
>>>>>>> dfe1c02b3a5811cc1638a25971369da63afa1f0d
import { CreateServicesListRequest, Resource } from 'models'
import { useRouter } from 'next/router'
import { BaseSyntheticEvent, createContext, useContext, useState } from 'react'
import { SubmitHandler, useForm, UseFormReturn } from 'react-hook-form'
import { useMutation } from 'react-query'
import * as yup from 'yup'

interface CreateListForm {
  name: string
  creator: string
  description: string
}

const fieldRequiredMessage = 'Cannot be blank'

const createListSchema = yup.object({
  name: yup.string().required(fieldRequiredMessage),
  creator: yup.string().required(fieldRequiredMessage),
  description: yup.string().required(fieldRequiredMessage),
})

interface CreateListHandler {
  isAlertOpen: boolean
  onAlertClose: () => void
  onAlertOpen: () => void
  isDrawerOpen: boolean
  onDrawerClose: () => void
  onDrawerOpen: () => void
  selectedServices: Map<string, Resource>
  addServiceToList: (service: Resource) => void
  removeServiceFromList: (serviceId: string) => void
  form: UseFormReturn<CreateListForm>
  onSubmit: (e?: BaseSyntheticEvent) => Promise<void>
  isCreatingServicesList: boolean
}

const CreateListContext = createContext<CreateListHandler>(
  {} as CreateListHandler
)
export const useCreateListContext = (): CreateListHandler =>
  useContext(CreateListContext)
export const CreateListProvider = CreateListContext.Provider

export const useCreateList = (): CreateListHandler => {
  const {
    isOpen: isAlertOpen,
    onOpen: onAlertOpen,
    onClose: onAlertClose,
  } = useDisclosure({ id: 'createListAlert' })

  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclosure({ id: 'createListDrawer' })

  const form = useForm<CreateListForm>({
    mode: 'onBlur',
    resolver: yupResolver(createListSchema),
  })

  const router = useRouter()
  const {
    mutate: createServicesListMutate,
    isLoading: isCreatingServicesList,
  } = useMutation<AirtableCreateResponse[], Error, CreateServicesListRequest[]>(
    (createServicesListRequests) =>
      createServicesLists(createServicesListRequests),
    {
      onSuccess: (data: AirtableCreateResponse[]) => {
        router.push(`/list/${data[0].id}`)
      },
    }
  )

  const { handleSubmit } = form
  const submitHandler: SubmitHandler<CreateListForm> = (data) => {
    createServicesListMutate([
      {
        name: data.name,
        description: data.description,
        creator: data.creator,
        Status: 'Draft',
        Resources: [...selectedServices.keys()],
      },
    ])
  }
  const onSubmit = handleSubmit(submitHandler)

  const [selectedServices, setSelectedServices] = useState(
    new Map<string, Resource>()
  )
  const addServiceToList = (service: Resource) => {
    setSelectedServices(selectedServices.set(service.id, service))
  }
  const removeServiceFromList = (serviceId: string) => {
    selectedServices.delete(serviceId)
    setSelectedServices(new Map(selectedServices))
  }

  return {
    isAlertOpen,
    onAlertClose,
    onAlertOpen,
    isDrawerOpen,
    onDrawerClose,
    onDrawerOpen,
    selectedServices,
    addServiceToList,
    removeServiceFromList,
    form,
    onSubmit,
    isCreatingServicesList,
  }
}
