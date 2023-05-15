import {
  FieldValues,
  Path,
  UseFormRegisterReturn,
  UseFormReturn,
} from 'react-hook-form'

interface HookFormProps extends UseFormRegisterReturn {
  isInvalid: boolean
  error: string
}

export const useHookFormProps = <T extends FieldValues>(
  name: Path<T>,
  form: UseFormReturn<T>
): HookFormProps => {
  const { register, formState } = form
  const { errors } = formState

  const isInvalid = name in errors
  const error = isInvalid ? (errors[name]?.message as string) : ''

  return {
    isInvalid,
    error,
    ...register(name),
  }
}
