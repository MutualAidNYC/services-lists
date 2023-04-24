import {
  Button,
  Divider,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useHookFormProps } from 'hooks'
import { AuthState } from 'models/users'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { Eye, EyeOff } from 'react-feather'
import { ErrorOption, useForm } from 'react-hook-form'
import { emailSignIn } from 'utils/firebase'
import * as yup from 'yup'
import { GoogleSignInButton } from '.'

interface LoginProps {
  setCurrentState: Dispatch<SetStateAction<AuthState>>
}

interface LoginForm {
  email: string
  password: string
}

const loginFormSchema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required(),
})

const initialState = {
  email: '',
  password: '',
}

const Login = ({ setCurrentState }: LoginProps): JSX.Element => {
  const form = useForm({
    defaultValues: initialState,
    resolver: yupResolver(loginFormSchema),
  })

  const [showPassword, setShowPassword] = useState(false)

  const onSubmit = async ({ email, password }: LoginForm) => {
    // TODO handle different types of possible firebase errors and return types also add a toast
    const res = await emailSignIn(email, password)
    if (res.code !== 200) {
      const error: ErrorOption = {
        // truncates the code #### from the error message so the string is more user friendly/readable
        message: res.message.substring(9),
      }
      form.setError('password', error)
    }
  }

  return (
    <VStack flex={1} w="100%" justifyContent="space-between" color="black">
      <Text fontSize={'3xl'} fontWeight="bold">
        Login
      </Text>
      <GoogleSignInButton />
      <HStack w="100%">
        <Divider border="1px solid gray.400" />
        <Text> or </Text>
        <Divider border="1px solid gray.400" />
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
                form.setFocus('password')
              }
            }}
          />
        </VStack>

        <InputGroup>
          <Input
            isRequired
            {...useHookFormProps('password', form)}
            _invalid={{ borderColor: 'red', outlineColor: 'none' }}
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            onKeyDown={(e) => {
              if (e.key == 'Enter') {
                form.handleSubmit(onSubmit)()
              }
            }}
          />
          <InputRightElement
            onClick={() => setShowPassword(!showPassword)}
            cursor="pointer"
            // eslint-disable-next-line react/no-children-prop
            children={showPassword ? <EyeOff /> : <Eye />}
          />
        </InputGroup>

        <Button w="100%" onClick={form.handleSubmit(onSubmit)}>
          Sign In
        </Button>
      </VStack>

      <VStack>
        <Text
          variant={'clickable'}
          onClick={() => setCurrentState('forgot_password')}
        >
          Forgot your Password?
        </Text>
        <Text variant={'clickable'} onClick={() => setCurrentState('sign_up')}>
          Create an account
        </Text>
      </VStack>
    </VStack>
  )
}

export default Login
