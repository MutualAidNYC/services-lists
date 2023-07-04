import {
  forwardRef,
  Textarea as ChakraTextarea,
  TextareaProps as ChakraTextareaProps,
} from '@chakra-ui/react'
import { FormControl, FormControlChildProps } from './FormControl'

type TextareaProps = ChakraTextareaProps & FormControlChildProps

export const Textarea = forwardRef<TextareaProps, 'input'>(
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
        <ChakraTextarea ref={ref} {...props} />
      </FormControl>
    )
  }
)
