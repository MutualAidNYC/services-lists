import {
  FormControl as ChakraFormControl,
  FormControlOptions,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
} from '@chakra-ui/react'
import { ReactNode } from 'react'

type FormControlProps = {
  id?: string
  label?: string
  error?: string
  helperText?: string
  children: ReactNode
} & FormControlOptions

export type FormControlChildProps = Omit<FormControlProps, 'id' | 'children'>

export const FormControl = ({
  id,
  label,
  error,
  helperText,
  children,
  ...props
}: FormControlProps): JSX.Element => {
  return (
    <ChakraFormControl id={id} {...props}>
      {label && <FormLabel htmlFor={id}>{label}</FormLabel>}
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      {children}
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </ChakraFormControl>
  )
}
