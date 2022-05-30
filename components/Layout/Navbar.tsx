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
} from '@chakra-ui/react'

export const Navbar = (): JSX.Element => {
  return (
    <Flex
      alignItems="center"
      bgColor="#204045"
      color="white"
      p="20px"
      justify="space-between"
    >
      <Link href="/">
        <Image
          src="/manyc_logo_no_background.png"
          w="108px"
          h="96px"
          alt="Mutual Aid NYC"
        />
      </Link>
      <HStack
        spacing={{ base: '16px', lg: '32px' }}
        display={{ base: 'none', md: 'inherit' }}
      >
        <Link href="/">Resource lists</Link>
        <Link href="https://resources.mutualaid.nyc/">Resource directory</Link>
        <Link href="/create-list">Create new list</Link>
        <Link href="https://mutualaid.nyc/">About Mutual Aid NYC</Link>
      </HStack>
      <Menu>
        <MenuButton
          display={{ base: 'inherit', md: 'none' }}
          as={IconButton}
          aria-label="Navbar menu"
          icon={<HamburgerIcon />}
          bgColor="#204045"
        />
        <MenuList
          display={{ base: 'inherit', md: 'none' }}
          bgColor="darkPurple"
        >
          <MenuItem
            _focus={{ background: 'darkPurple', filter: 'brightness(150%)' }}
          >
            <Link href="/">Resource lists</Link>
          </MenuItem>
          <MenuItem>
            <Link href="https://resources.mutualaid.nyc/">
              Resource directory
            </Link>
          </MenuItem>
          <MenuItem>
            <Link href="/create-list">Create new list</Link>
          </MenuItem>
          <MenuItem>
            <Link href="https://mutualaid.nyc/">About Mutual Aid NYC</Link>
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  )
}
