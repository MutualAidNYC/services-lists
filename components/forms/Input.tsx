import {
  forwardRef,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
} from '@chakra-ui/react'
import { FormControl, FormControlChildProps } from './FormControl'

type InputProps = ChakraInputProps & FormControlChildProps

export const Input = forwardRef<InputProps, 'input'>(
  (
    {
      id,
      isRequired,
      isDisabled,
      isInvalid,
      isReadOnly,
      label,
      error,
      helperText,
      ...props
    },
    ref
  ): JSX.Element => {
    return (
      <FormControl
        id={id}
        isRequired={isRequired}
        isDisabled={isDisabled}
        isInvalid={isInvalid}
        isReadOnly={isReadOnly}
        label={label}
        error={error}
        helperText={helperText}
      >
        <ChakraInput ref={ref} {...props} />
      </FormControl>
    )
  }
)
