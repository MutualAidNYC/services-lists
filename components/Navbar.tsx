import { 
  Flex,
  HStack,
  Link,
  Image
} from '@chakra-ui/react'

export const Navbar = (): JSX.Element => {
  return (
    <Flex alignItems='center' bgColor='#283F44' color='white' px='32px' py='32px' justifyContent='space-between'>
        <Image
          htmlWidth="108px"
          htmlHeight="96px"
          objectFit="cover"
          src="/manyc_logo.png"
          alt="Mutual Aid NYC"
        />
      <HStack spacing='32px'>
        <Link>
          Services
        </Link>
        <Link>
          Categories
        </Link>
        <Link>
          Lists
        </Link>
        <Link>
          Submit A New List
        </Link>
        <Link>
          Organizations
        </Link>
        <Link>
          About
        </Link>
      </HStack>
    </Flex>
  )
}
