import { Heading } from '@chakra-ui/react'
import { ServicesLists } from '../components/ServicesLists'

export default function Home(): JSX.Element {
  return (
    <>
      <Heading fontSize='48px' mb='36px'>Services Lists</Heading>
      <ServicesLists />
    </>
  )
}
