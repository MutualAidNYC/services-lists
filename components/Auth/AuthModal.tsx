import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import React from 'react'
import { AuthContainer } from '.'

interface Props {
  isOpen: boolean
  onClose: () => void
  message: string
}

const AuthModal = ({ isOpen, onClose, message }: Props): JSX.Element => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader w="100%" flexGrow={1}>
          MANYC
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody w="100%" display={'flex'} alignItems="center">
          <AuthContainer
            initialState={'log_in'}
            displayBorder={false}
            descriptiveText={message}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default AuthModal
