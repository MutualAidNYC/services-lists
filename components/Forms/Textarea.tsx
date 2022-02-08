import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  forwardRef,
  Textarea as ChakraTextarea,
  TextareaProps as ChakraTextareaProps,
} from '@chakra-ui/react'

interface TextareaProps extends ChakraTextareaProps {
  label?: string
  error?: string
}

export const Textarea = forwardRef<TextareaProps, 'textarea'>(
  (
    {
      isDisabled,
      isInvalid,
      isReadOnly,
      isRequired,
      id,
      label,
      error,
      ...props
    },
    ref
  ): JSX.Element => {
    return (
      <FormControl
        id={id}
        isDisabled={isDisabled}
        isReadOnly={isReadOnly}
        isRequired={isRequired}
        isInvalid={isInvalid}
      >
        {label && <FormLabel htmlFor={id}>{label}</FormLabel>}
        <ChakraTextarea ref={ref} {...props} />
        <FormErrorMessage>{error}</FormErrorMessage>
      </FormControl>
    )
  }
)
