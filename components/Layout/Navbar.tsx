import { HamburgerIcon } from '@chakra-ui/icons'
import {
  Flex,
  HStack,
  Link,
  Image,
  Box,
  DrawerOverlay,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,

  useDisclosure,
  VStack
} from '@chakra-ui/react'
import React from 'react'

export const Navbar = (): JSX.Element => {


  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Flex alignItems='center' bgColor='darkTeal' color='white' px='32px' py='32px' justify='space-between'>
      <Link href='/'>
        <Image
          src='/manyc_logo_no_background.png'
          w='108px'
          h='96px'
          alt="Mutual Aid NYC"
        />
      </Link>
      <HStack spacing='32px' pr={4} display={{ base: 'none', md: 'inherit' }}>
        <Link href='/'>
          Resource Lists
        </Link>
        <Link href='https://resources.mutualaid.nyc/'>
          Resource Directory
        </Link>
        <Link href="/create-list">
          Create New List
        </Link>
        <Link href='https://mutualaid.nyc/'>
          About Mutual Aid NYC
        </Link>
      </HStack>

      <Box display={{ base: 'inherit', md: 'none' }}>
        <HamburgerIcon onClick={onOpen} boxSize={12} mr={4} />
        <Drawer
          isOpen={isOpen}
          placement='right'
          onClose={onClose}

        >
          <DrawerOverlay />
          <DrawerContent bgColor='darkTeal' color='white'>

            <DrawerCloseButton />

            <DrawerBody display='flex'  >
              <VStack w='100%' justifyContent='center' spacing={6} fontFamily='heading' fontSize={24}>
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
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>
    </Flex>
  )
}

