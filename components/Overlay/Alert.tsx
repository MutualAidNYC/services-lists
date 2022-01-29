import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogProps,
} from '@chakra-ui/react'

export const Alert = ({
  isCentered = true,
  scrollBehavior = 'inside',
  children,
  ...props
}: AlertDialogProps): JSX.Element => {
  return (
    <AlertDialog
      isCentered={isCentered}
      scrollBehavior={scrollBehavior}
      {...props}
    >
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogCloseButton />
        <AlertDialogBody padding="32px">
          {children}
        </AlertDialogBody>
      </AlertDialogContent>
    </AlertDialog>
  )
}
