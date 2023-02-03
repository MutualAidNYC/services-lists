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
import React, { Dispatch, SetStateAction, useState } from 'react'
import { Controller, ErrorOption, useForm } from 'react-hook-form'
import { emailSignIn } from 'utils/firebase'
import * as yup from 'yup'
import { GoogleSignInComponent } from '.'

interface LoginProps {
  setCurrentState: Dispatch<SetStateAction<'sign_up' | 'log_in'>>
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
  const methods = useForm({
    defaultValues: initialState,
    resolver: yupResolver(loginFormSchema),
  })

  const [showPassword, setShowPassword] = useState(false)

  const onSubmit = ({ email, password }: LoginForm) => {
    emailSignIn(email, password)
      .then((res) => {
        // TODO handle different types of possible firebase errors and return types also add a toast
        if (res.code !== 200) {
          const error: ErrorOption = {
            message: res.message.substring(9),
          }
          methods.setError('password', error)
        }
      })
      .catch((err) => console.log(err))
  }

  return (
    <VStack flex={1} w="100%" justifyContent="space-between" color="black">
      <Text fontSize={'3xl'} fontWeight="bold">
        Login
      </Text>
      <GoogleSignInComponent />
      <HStack w="100%">
        <Divider border="1px solid gray.400" />
        <Text> or </Text>
        <Divider border="1px solid gray.400" />
      </HStack>

      <VStack w="100%" maxW="xs" as="form">
        <Controller
          control={methods.control}
          name="email"
          render={({ field, fieldState }) => {
            return (
              <VStack w="100%">
                <Input
                  borderColor={fieldState.error ? 'red' : 'inherit'}
                  type="email"
                  value={field.value}
                  placeholder="Email Address"
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  onKeyDown={(e) => {
                    if (e.key == 'Enter') {
                      methods.setFocus('password')
                    }
                  }}
                />
                {fieldState.error && (
                  <Text w="100%" color="red">
                    {fieldState.error.message}
                  </Text>
                )}
              </VStack>
            )
          }}
        />
        <Controller
          control={methods.control}
          name="password"
          render={({ field, fieldState }) => {
            return (
              <VStack w="100%">
                <InputGroup>
                  <Input
                    ref={field.ref}
                    onBlur={field.onBlur}
                    borderColor={fieldState.error ? 'red' : 'inherit'}
                    type={showPassword ? 'text' : 'password'}
                    value={field.value}
                    placeholder="Password"
                    onChange={field.onChange}
                    onKeyDown={(e) => {
                      if (e.key == 'Enter') {
                        methods.handleSubmit(onSubmit)()
                      }
                    }}
                  />
                  <InputRightElement
                    // eslint-disable-next-line react/no-children-prop
                    children={
                      <Button
                        variant="ghost"
                        mr={4}
                        fontWeight="light"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? 'Hide' : 'Show'}
                      </Button>
                    }
                  />
                </InputGroup>
                {fieldState.error && (
                  <Text w="100%" color="red">
                    {fieldState.error.message}
                  </Text>
                )}
              </VStack>
            )
          }}
        />

        <Button w="100%" onClick={methods.handleSubmit(onSubmit)}>
          Sign In
        </Button>
      </VStack>

      <VStack>
        <Text
          fontWeight="medium"
          cursor={'pointer'}
          _hover={{ textDecor: 'underline' }}
        >
          Forgot your Password?
        </Text>
        <Text
          fontWeight="medium"
          cursor={'pointer'}
          _hover={{ textDecor: 'underline' }}
          onClick={() => setCurrentState('sign_up')}
        >
          Create an account
        </Text>
      </VStack>
    </VStack>
  )
}

export default Login
