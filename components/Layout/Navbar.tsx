import { HamburgerIcon } from '@chakra-ui/icons'
import {
  Flex,
  HStack,
  IconButton,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
} from '@chakra-ui/react'
import { AvatarIcon } from 'components/Icons'

export const Navbar = (): JSX.Element => {
  return (
    <Stack
      w="100%"
      alignItems={'center'}
      color="#667085"
      borderBottom="1px solid #F2F4F7"
      bgColor="white"
    >
      <Flex
        alignItems="center"
        justify="space-between"
        w="100%"
        maxW="7xl"
        display={{ base: 'none', lg: 'inherit' }}
      >
        <HStack spacing={{ base: '16px', lg: '32px' }}>
          <Link href="/">
            <Image
              src="/new_manyc_logo.png"
              w="108px"
              h="96px"
              alt="Mutual Aid NYC"
            />
          </Link>
          <Link href="/">Resource lists</Link>
          <Link href="https://resources.mutualaid.nyc/">Resource library</Link>
          <Link href="/create-list">Create new list</Link>
          <Link href="https://mutualaid.nyc/submit-a-resource/">
            Submit a resource
          </Link>
          <Link href="https://mutualaid.nyc/">About Mutual Aid NYC</Link>
        </HStack>
        <Link href="/profile">
          <HStack cursor="pointer" _hover={{ textDecoration: 'underline' }}>
            <AvatarIcon />
            <Text> Account </Text>
          </HStack>
        </Link>
        <Menu>
          <MenuButton
            display={{ base: 'inherit', lg: 'none' }}
            as={IconButton}
            aria-label="Navbar menu"
            icon={<HamburgerIcon />}
            bgColor="#204045"
          />
          <MenuList
            display={{ base: 'inherit', lg: 'none' }}
            bgColor="darkPurple"
          >
            <MenuItem
              _focus={{ background: 'darkPurple', filter: 'brightness(150%)' }}
            >
              <Link href="/">Resource lists</Link>
            </MenuItem>
            <MenuItem>
              <Link href="https://resources.mutualaid.nyc/">
                Resource library
              </Link>
            </MenuItem>
            <MenuItem>
              <Link href="/create-list">Create new list</Link>
            </MenuItem>
            <MenuItem>
              <Link href="https://mutualaid.nyc/submit-a-resource/">
                Submit a resource
              </Link>
            </MenuItem>
            <MenuItem>
              <Link href="https://mutualaid.nyc/">About Mutual Aid NYC</Link>
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <Flex
        alignItems="center"
        justify="space-between"
        w="100%"
        maxW="7xl"
        display={{ base: 'inherit', lg: 'none' }}
      >
        <Link href="/">
          <Image
            src="/new_manyc_logo.png"
            w="108px"
            h="96px"
            alt="Mutual Aid NYC"
          />
        </Link>

        <Menu>
          <MenuButton
            display={{ base: 'inherit', lg: 'none' }}
            as={IconButton}
            aria-label="Navbar menu"
            icon={<HamburgerIcon />}
            bgColor="white"
          />
          <MenuList display={{ base: 'inherit', lg: 'none' }}>
            <MenuItem>
              <Link href="/">Resource lists</Link>
            </MenuItem>
            <MenuItem>
              <Link href="https://resources.mutualaid.nyc/">
                Resource library
              </Link>
            </MenuItem>
            <MenuItem>
              <Link href="/create-list">Create new list</Link>
            </MenuItem>
            <MenuItem>
              <Link href="https://mutualaid.nyc/submit-a-resource/">
                Submit a resource
              </Link>
            </MenuItem>
            <MenuItem>
              <Link href="https://mutualaid.nyc/">About Mutual Aid NYC</Link>
            </MenuItem>
            <MenuItem>
              <Link href="/profile">
                <Text> Account </Text>
              </Link>
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Stack>
  )
}
