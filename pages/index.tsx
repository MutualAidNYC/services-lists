import { Heading } from '@chakra-ui/react'
import { ServicesLists } from '../components/ServicesLists'

export default function Home(): JSX.Element {
  return (
    <>
      <Heading fontSize='headline1' mb='36px'>Services Lists</Heading>
      <ServicesLists />
    </>
  )
}
