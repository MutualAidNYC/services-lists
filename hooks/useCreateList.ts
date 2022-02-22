import {
  BaseSyntheticEvent,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useMutation, useQuery } from 'react-query'
import {
  AirtableCreateResponse,
  createServicesLists,
  getAllServices,
} from 'api'
import { CreateServicesListRequest, Service } from 'models'
import { useDisclosure } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm, UseFormReturn } from 'react-hook-form'
import * as yup from 'yup'
import { useRouter } from 'next/router'

export interface CreateListForm {
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
  isLoading: boolean
  baseServices: Service[]
  services: Service[]
  setServices: (services: Service[]) => void
  isAlertOpen: boolean
  onAlertClose: () => void
  onAlertOpen: () => void
  isDrawerOpen: boolean
  onDrawerClose: () => void
  onDrawerOpen: () => void
  selectedServices: Map<string, Service>
  addServiceToList: (service: Service) => void
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
  const { isLoading: isLoadingServices, data: baseServices } = useQuery<
    Service[],
    Error
  >(['allServices'], () => getAllServices(), {
    retry: false,
    refetchOnWindowFocus: false,
  })
  const [services, setServices] = useState(baseServices)
  useEffect(() => setServices(baseServices), [baseServices])

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
        Services: [...selectedServices.keys()],
      },
    ])
  }
  const onSubmit = handleSubmit(submitHandler)

  const [selectedServices, setSelectedServices] = useState(
    new Map<string, Service>()
  )
  const addServiceToList = (service: Service) => {
    setSelectedServices(selectedServices.set(service.id, service))
  }
  const removeServiceFromList = (serviceId: string) => {
    selectedServices.delete(serviceId)
    setSelectedServices(new Map(selectedServices))
  }

  return {
    isLoading: isLoadingServices,
    baseServices: baseServices ?? [],
    services: services ?? [],
    setServices,
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
