import { FormControl, FormErrorMessage, FormLabel, forwardRef, Input as ChakraInput, InputProps as ChakraInputProps } from '@chakra-ui/react'

interface InputProps extends ChakraInputProps {
  label?: string
  error?: string
}

export const Input = forwardRef<InputProps, 'input'>(({
  isDisabled,
  isInvalid,
  isReadOnly,
  isRequired,
  id,
  label,
  error,
  ...props
}, ref): JSX.Element => {
  return (
    <FormControl
      id={id}
      isDisabled={isDisabled}
      isReadOnly={isReadOnly}
      isRequired={isRequired}
      isInvalid={isInvalid}
    >
      {label && <FormLabel htmlFor={id}>{label}</FormLabel>}
      <ChakraInput ref={ref} {...props} />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  )
})