import {
  Drawer as ChakraDrawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  DrawerProps,
} from '@chakra-ui/react'

export const Drawer = ({
  children,
  ...props
}: DrawerProps): JSX.Element => {
  return (
    <ChakraDrawer {...props}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerBody padding="32px"> 
          {children}
        </DrawerBody>
      </DrawerContent>
    </ChakraDrawer>
  )
}
