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
import { emailSignUp } from 'utils/firebase'
import * as yup from 'yup'
import { GoogleSignInButton } from '.'

interface SignUpProps {
  setCurrentState: Dispatch<SetStateAction<AuthState>>
}

interface SignUpForm {
  email: string
  password: string
  firstName: string
  lastName: string
  organization: string
}

const signUpFormSchema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  organization: yup.string(),
})

const initialState: SignUpForm = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  organization: '',
}

const SignUp = ({ setCurrentState }: SignUpProps): JSX.Element => {
  const form = useForm({
    defaultValues: initialState,
    resolver: yupResolver(signUpFormSchema),
  })

  const [showPassword, setShowPassword] = useState(false)

  const onSubmit = async ({
    email,
    password,
    firstName,
    lastName,
    organization,
  }: SignUpForm) => {
    // TODO handle different types of possible firebase errors and return types also add a toast
    const res = await emailSignUp(
      email,
      password,
      firstName,
      lastName,
      organization
    )

    if (res.code !== 200) {
      const error: ErrorOption = {
        message: res.message.substring(9),
      }
      form.setError('password', error)
    }
  }

  return (
    <VStack flex={1} w="100%" justifyContent="space-between" color="black">
      <Text fontSize={'3xl'} fontWeight="bold">
        Create an Account
      </Text>
      <GoogleSignInButton />
      <HStack w="100%">
        <Divider border="1px solid gray.400" />
        <Text> or </Text>
        <Divider border="1px solid gray.400" />
      </HStack>
      <VStack w="100%" maxW="xs">
        <HStack>
          <Input
            isRequired
            {...useHookFormProps('firstName', form)}
            _invalid={{ borderColor: 'red', outlineColor: 'none' }}
            type="text"
            placeholder="First Name"
            onKeyDown={(e) => {
              if (e.key == 'Enter') {
                form.setFocus('lastName')
              }
            }}
          />

          <Input
            isRequired
            {...useHookFormProps('lastName', form)}
            _invalid={{ borderColor: 'red', outlineColor: 'none' }}
            type="text"
            placeholder="Last Name"
            onKeyDown={(e) => {
              if (e.key == 'Enter') {
                form.setFocus('organization')
              }
            }}
          />
        </HStack>

        <Input
          {...useHookFormProps('organization', form)}
          _invalid={{ borderColor: 'red', outlineColor: 'none' }}
          type="text"
          placeholder="Organization (Optional)"
          onKeyDown={(e) => {
            if (e.key == 'Enter') {
              form.setFocus('email')
            }
          }}
        />

        <Input
          isRequired
          {...useHookFormProps('email', form)}
          _invalid={{ borderColor: 'red', outlineColor: 'none' }}
          type="email"
          placeholder="Email Address"
          onKeyDown={(e) => {
            if (e.key == 'Enter') {
              form.setFocus('password')
            }
          }}
        />

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

      <Text
        fontWeight="medium"
        variant="clickable"
        onClick={() => setCurrentState('log_in')}
      >
        Already have an account? Log in.
      </Text>
    </VStack>
  )
}

export default SignUp
