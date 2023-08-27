import {
  HStack,
  Spinner,
  Stack,
  Tab,
  TabList,
  Tabs,
  Text,
  VStack,
} from '@chakra-ui/react'
import { Collections } from 'components'
import { AuthContainer, useAuth } from 'components/Auth'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { useState } from 'react'
import { signout } from 'utils/firebase'

export const ProfilePage: NextPage = () => {
  const { authUser: user, userData, isLoading } = useAuth()

  // 0 -> Collections  1 -> Profile
  const [tabIndex, setTabIndex] = useState(0)

  return (
    <Stack spacing="32px" w="100%" height={'100vh'} p={{ base: 4, md: 12 }}>
      <NextSeo
        title="Resource Lists - Account Page"
        description="Your Mutual Aid NYC account page."
        canonical="https://lists.mutualaid.nyc/profile"
      />

      <Stack spacing="16px" w="100%" alignItems={'center'}>
        {isLoading && <Spinner variant="primary" />}
        {!user && !isLoading && (
          <AuthContainer
            displayBorder={true}
            initialState={'log_in'}
            descriptiveText={'You must be signed in to view this page'}
          />
        )}
        {userData && !isLoading && (
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
              <Tabs
                w="100%"
                defaultIndex={0}
                variant="line"
                colorScheme="black"
                size="lg"
                onChange={(index) => setTabIndex(index)}
              >
                <TabList color="black">
                  <Tab _selected={{ fontWeight: 700 }}>My Collections</Tab>
                  {/* Removing this for now until we have a profile section/ decide what to do there */}
                  {/* <Tab _selected={{ fontWeight: 700 }}>Profile</Tab> */}
                </TabList>
              </Tabs>

              <VStack pt={{ base: 2, md: 4 }} alignItems="left" w="100%">
                {tabIndex === 0 && <Collections userData={userData} />}
                {tabIndex === 1 && <Text> Profile </Text>}
              </VStack>
            </VStack>
          </Stack>
        )}
      </Stack>
    </Stack>
  )
}

export default ProfilePage
