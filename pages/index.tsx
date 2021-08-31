import { Heading } from '@chakra-ui/react'
import { SearchBar, ServicesLists } from '../components'
import {
  SearchProvider,
  ServicesListsProvider,
  useServicesLists,
} from '../hooks'

export default function Home(): JSX.Element {
  const servicesListHandler = useServicesLists()
  const { searchHandler } = servicesListHandler

  return (
    <ServicesListsProvider value={servicesListHandler}>
      <SearchProvider value={searchHandler}>
        <Heading fontSize='heading1' mb='36px'>Services Lists</Heading>
        <SearchBar mb='72px' />
        <ServicesLists />
      </SearchProvider>
    </ServicesListsProvider>
  )
}
