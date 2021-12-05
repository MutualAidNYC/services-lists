import { 
  Flex,
  HStack,
  Link,
  Image
} from '@chakra-ui/react'

export const Navbar = (): JSX.Element => {
  return (
    <Flex alignItems='center' bgColor='darkTeal' color='white' px='32px' py='32px' justifyContent='space-between'>
      <Image
        src='/manyc_logo_no_background.png'
        w='108px'
        h='96px'
        alt="Mutual Aid NYC"
      />
      <HStack spacing='32px'>
        <Link href='#'>
          Resource Lists 
        </Link>
        <Link href='https://resources.mutualaid.nyc/'>
          Resource Directory 
        </Link>
        <Link>
          Create New List   (Coming Soon)
        </Link>
        <Link href='https://mutualaid.nyc/'>
          About MutualAidNYC
        </Link>
      </HStack>
    </Flex>
  )
}
