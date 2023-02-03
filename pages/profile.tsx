import { Button, Stack } from '@chakra-ui/react'
import { AuthContainer, useUser } from 'components/Auth'
import { NextPage } from 'next'
import Head from 'next/head'
import { signout } from 'utils/firebase'

export const ProfilePage: NextPage = () => {
  const { userData } = useUser()

  return (
    <Stack spacing="32px" w="100%" p={{ base: '48px', md: '64px' }}>
      <Head>
        <title>Resource Lists</title>
        <meta
          name="description"
          content={'Your Mutual Aid NYC profile page.'}
        />
        <meta name="image" content="/manyc_logo.png" />
        <link rel="icon" href="/icon.ico" />
      </Head>
      <Stack spacing="16px" w="100%" alignItems={'center'}>
        {!userData && (
          <AuthContainer
            displayBorder={true}
            initialState={'log_in'}
            descriptiveText={'You must be signed in to view this page'}
          />
        )}
        <Button
          onClick={async () => {
            await signout()
          }}
        >
          sign out
        </Button>
      </Stack>
    </Stack>
  )
}

export default ProfilePage
