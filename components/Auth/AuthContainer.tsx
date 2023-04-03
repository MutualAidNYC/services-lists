import { Text, VStack } from '@chakra-ui/react'
import { AuthState } from 'models/users'
import React, { useState } from 'react'
import ForgotPassword from './ForgotPassword'
import Login from './Login'
import SignUp from './Signup'

interface AuthContainerProps {
  initialState: AuthState
  descriptiveText?: string
  displayBorder: boolean
}

export const AuthContainer = ({
  initialState,
  descriptiveText,
  displayBorder,
}: AuthContainerProps): JSX.Element => {
  const [currentState, setCurrentState] = useState<AuthState>(initialState)

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
      {currentState == 'log_in' && <Login setCurrentState={setCurrentState} />}
      {currentState == 'sign_up' && (
        <SignUp setCurrentState={setCurrentState} />
      )}
      {currentState == 'forgot_password' && (
        <ForgotPassword setCurrentState={setCurrentState} />
      )}
    </VStack>
  )
}
