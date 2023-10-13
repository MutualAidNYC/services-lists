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
import { AuthModal, useAuth } from 'components'
import { User } from 'react-feather'

export const Navbar = (): JSX.Element => {
  const { isLoading, userData, isModalOpen, onModalOpen, onModalClose } =
    useAuth()

  return (
    <Stack
      w="100%"
      alignItems={'center'}
      color="#667085"
      borderBottom="1px solid #F2F4F7"
      bgColor="white"
    >
      <AuthModal
        isOpen={isModalOpen}
        onClose={onModalClose}
        message={'Login to MANY Resources Hub'}
      />
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
              src="/teal_manyc_logo.png"
              w="108px"
              h="96px"
              alt="Mutual Aid NYC"
            />
          </Link>
          <Link href="/">Resource hub</Link>
          <Link href="https://resources.mutualaid.nyc/">Resource library</Link>
          <Link href="https://mutualaid.nyc/submit-a-resource/">
            Submit a resource
          </Link>
          <Link href="https://mutualaid.nyc/">About Mutual Aid NYC</Link>
        </HStack>
        {userData && !isLoading && (
          <Link href="/profile">
            <HStack cursor="pointer" _hover={{ textDecoration: 'underline' }}>
              <User />
              <Text> Account </Text>
            </HStack>
          </Link>
        )}
        {!userData && !isLoading && (
          <HStack
            cursor="pointer"
            _hover={{ textDecoration: 'underline' }}
            onClick={onModalOpen}
          >
            <User />
            <Text> Log In/ Sign Up </Text>
          </HStack>
        )}

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
              <Link href="/">Resource hub</Link>
            </MenuItem>
            <MenuItem>
              <Link href="https://resources.mutualaid.nyc/">
                Resource library
              </Link>
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
            src="/teal_manyc_logo.png"
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
            icon={<HamburgerIcon color="black" />}
            bgColor="white"
          />
          <MenuList display={{ base: 'inherit', lg: 'none' }}>
            <MenuItem>
              <Link href="/">Resource hub</Link>
            </MenuItem>
            <MenuItem>
              <Link href="https://resources.mutualaid.nyc/">
                Resource library
              </Link>
            </MenuItem>
            <MenuItem>
              <Link href="https://mutualaid.nyc/submit-a-resource/">
                Submit a resource
              </Link>
            </MenuItem>
            <MenuItem>
              <Link href="https://mutualaid.nyc/">About Mutual Aid NYC</Link>
            </MenuItem>
            <MenuItem
              onClick={!userData && !isLoading ? onModalOpen : undefined}
            >
              {userData && !isLoading && (
                <Link href="/profile">
                  <Text> Account </Text>
                </Link>
              )}
              {!userData && !isLoading && <Text> Log In/ Sign Up </Text>}
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Stack>
  )
}
