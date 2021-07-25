import { 
  Flex,
  Text,
  HStack,
  Link,
} from '@chakra-ui/react'

export const Navbar = (): JSX.Element => {
  return (
    <Flex alignItems='center' bgColor='#283F44' color='white' px='32px' py='64px' justifyContent='space-between'>
      <Text>
        Mutual Aid NYC
      </Text>
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
