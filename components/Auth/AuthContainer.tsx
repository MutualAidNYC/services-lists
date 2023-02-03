import { Text, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import Login from './Login'
import SignUp from './Signup'

interface AuthContainerProps {
  initialState: 'sign_up' | 'log_in'
  descriptiveText?: string
  displayBorder: boolean
}

export const AuthContainer = ({
  initialState,
  descriptiveText,
  displayBorder,
}: AuthContainerProps): JSX.Element => {
  const [currentState, setCurrentState] = useState<'sign_up' | 'log_in'>(
    initialState
  )

  return (
    <VStack
      w="md"
      minH="md"
      border={displayBorder ? '1px solid #e5e5e5' : 'none'}
      rounded="xl"
      p={4}
    >
      <Text fontWeight={'semi-bold'} fontSize="lg" pt={2}>
        {descriptiveText}
      </Text>
      {currentState == 'log_in' && <Login setCurrentState={setCurrentState} />}{' '}
      {currentState == 'sign_up' && (
        <SignUp setCurrentState={setCurrentState} />
      )}
    </VStack>
  )
}
