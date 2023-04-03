import { ArrowBackIcon } from '@chakra-ui/icons'
import { Button, HStack, Input, Text, useToast, VStack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useHookFormProps } from 'hooks'
import { AuthState } from 'models/users'
import React, { Dispatch, SetStateAction } from 'react'
import { useForm } from 'react-hook-form'
import { resetPassword } from 'utils/firebase'
import * as yup from 'yup'

interface ForgotPasswordProps {
  setCurrentState: Dispatch<SetStateAction<AuthState>>
}

interface ForgotPasswordForm {
  email: string
}

const loginFormSchema = yup.object({
  email: yup.string().required().email(),
})

const initialState = {
  email: '',
}

const ForgotPassword = ({
  setCurrentState,
}: ForgotPasswordProps): JSX.Element => {
  const toast = useToast()

  const form = useForm({
    defaultValues: initialState,
    resolver: yupResolver(loginFormSchema),
  })

  const onSubmit = async ({ email }: ForgotPasswordForm) => {
    const response = await resetPassword(email)

    if (response.status === 200) {
      toast({
        title: 'Password Reset Email Sent',
        description: response.message,
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      setCurrentState('log_in')
    } else {
      toast({
        title: 'Error',
        description: response.message,
        status: `error`,
        duration: 5000,
        isClosable: true,
      })
    }
  }

  return (
    <VStack flex={1} w="100%" justifyContent="space-between" color="black">
      <HStack>
        <ArrowBackIcon
          boxSize={6}
          cursor="pointer"
          onClick={() => setCurrentState('log_in')}
          _hover={{ color: 'teal' }}
          _focus={{ color: 'teal' }}
        />
        <Text fontSize={'3xl'} fontWeight="bold">
          Reset Your Password
        </Text>
      </HStack>

      <VStack w="100%" maxW="xs" as="form">
        <VStack w="100%">
          <Input
            type="email"
            isRequired
            {...useHookFormProps('email', form)}
            _invalid={{ borderColor: 'red', outlineColor: 'none' }}
            placeholder="Email Address"
            onKeyDown={(e) => {
              if (e.key == 'Enter') {
                form.handleSubmit(onSubmit)()
              }
            }}
          />
        </VStack>

        <Button w="100%" onClick={form.handleSubmit(onSubmit)}>
          Reset Your Password
        </Button>
      </VStack>

      <VStack>
        <Text variant={'clickable'} onClick={() => setCurrentState('sign_up')}>
          Create an account
        </Text>
      </VStack>
    </VStack>
  )
}

export default ForgotPassword
