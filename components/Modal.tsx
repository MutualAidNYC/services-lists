import {
  Modal as ChakraModal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps as ChakraModalProps,
} from '@chakra-ui/react'
import { ReactNode } from 'react'

type ModalProps = ChakraModalProps & {
  title?: ReactNode
}

export const Modal = ({
  title,
  children,
  ...props
}: ModalProps): JSX.Element => {
  return (
    <ChakraModal {...props}>
      <ModalOverlay />
      <ModalContent>
        {title && (
          <ModalHeader px="32px" pt="32px" pb={0}>
            {title}
          </ModalHeader>
        )}
        <ModalCloseButton />
        <ModalBody p="32px">{children}</ModalBody>
      </ModalContent>
    </ChakraModal>
  )
}
