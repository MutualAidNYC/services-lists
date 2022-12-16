import { BaseSyntheticEvent, createContext, useContext, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import {
  AirtableCreateResponse,
  createServicesLists,
  getAllServices,
} from 'api'
import { CreateServicesListRequest, Resource } from 'models'
import { useDisclosure } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm, UseFormReturn } from 'react-hook-form'
import * as yup from 'yup'
import { useRouter } from 'next/router'
import {
  PaginationHandler,
  SortHandler,
  useFilters,
  usePagination,
  useSort,
} from 'hooks'

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
  isLoading: boolean
  visibleServices: Resource[]
  numServices: number
  setSearchQuery: (query: string) => void
  taxonomyOptions: { value: string; label: string }[]
  setTaxonomyFilters: (filters: string[]) => void
  sortHandler: SortHandler<Resource>
  paginationHandler: PaginationHandler<Resource>
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
  const { isLoading: isLoadingServices, data: baseServices } = useQuery<
    Resource[],
    Error
  >(['allServices'], () => getAllServices(), {
    retry: false,
    refetchOnWindowFocus: false,
  })

  const {
    isLoading: isLoadingFilters,
    filteredData: filteredServices,
    setSearchQuery,
    taxonomyOptions,
    setTaxonomyFilters,
  } = useFilters(baseServices ?? [], ['title', 'details'], 'needs')
  const sortHandler = useSort(filteredServices)
  const paginationHandler = usePagination(sortHandler.sortedData)

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
    isLoading: isLoadingServices || isLoadingFilters,
    visibleServices: paginationHandler.paginatedData,
    numServices: filteredServices.length,
    taxonomyOptions,
    setTaxonomyFilters,
    setSearchQuery,
    sortHandler,
    paginationHandler,
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
