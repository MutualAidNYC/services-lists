import { Button, Image } from '@chakra-ui/react'
import React from 'react'
import { googleSignIn } from 'utils/firebase'

export const GoogleSignInComponent = (): JSX.Element => {
  return (
    <Button
      w="100%"
      maxW="xs"
      variant="ghost"
      fontWeight={'light'}
      leftIcon={<Image src={'/google_logo.png'} alt={'Google'} boxSize={5} />}
      border="1px solid"
      borderColor={'gray.200'}
      backgroundColor="white"
      rounded="md"
      _hover={{ backgroundColor: '#efefef' }}
      onClick={async () => await googleSignIn()}
    >
      Sign in with Google
    </Button>
  )
}
