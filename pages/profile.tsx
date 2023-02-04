import { HStack, Stack, Text, VStack } from '@chakra-ui/react'
import { AuthContainer, useUser } from 'components/Auth'
import { NextPage } from 'next'
import Head from 'next/head'
import { signout } from 'utils/firebase'

export const ProfilePage: NextPage = () => {
  const { userData, loading } = useUser()

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
        {!userData && !loading && (
          <AuthContainer
            displayBorder={true}
            initialState={'log_in'}
            descriptiveText={'You must be signed in to view this page'}
          />
        )}
        {userData && !loading && (
          <Stack w="100%" direction={'column'} maxW="7xl">
            <HStack w="100%" justifyContent={'space-between'} color="black">
              <Text fontSize="5xl" fontWeight={'bold'}>
                Account{' '}
              </Text>
              <Text
                cursor="pointer"
                textDecor={'underline'}
                _hover={{ color: 'grey' }}
                onClick={async () => await signout()}
              >
                Sign Out
              </Text>
            </HStack>
            <VStack w="100%" pt={8}>
              <HStack
                margin={0}
                borderBottom="1px solid black"
                w="100%"
                color="black"
              >
                {/* Handle hover/mouse over and the current state text border values */}
                <Text
                  _hover={{
                    borderBottom: '2px solid black',
                    fontWeight: 'semibold',
                  }}
                  px={2}
                >
                  My Collections
                </Text>
                <Text
                  _hover={{
                    borderBottom: '2px solid black',
                    fontWeight: 'semibold',
                  }}
                  px={2}
                >
                  Profile
                </Text>
              </HStack>
            </VStack>
          </Stack>
        )}
      </Stack>
    </Stack>
  )
}

export default ProfilePage
