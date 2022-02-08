import {
  FieldValues,
  UseFormRegisterReturn,
  UseFormReturn,
  Path,
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

  const isInvalid = errors[name] !== undefined
  const error = isInvalid ? errors[name].message : ''

  return {
    isInvalid,
    error,
    ...register(name),
  }
}
