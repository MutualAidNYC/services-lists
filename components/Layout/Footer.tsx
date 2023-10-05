import { EmailIcon } from '@chakra-ui/icons'
import {
  Flex,
  HStack,
  LinkBox,
  LinkOverlay,
  Stack,
  Text,
} from '@chakra-ui/react'

const currentYear: number = new Date().getFullYear()

export const Footer = (): JSX.Element => {
  return (
    <Stack w="100%" alignItems={'center'}>
      <Flex
        alignItems="center"
        color="black"
        mt="16px"
        w="100%"
        maxW="7xl"
        // px={{ base: '48px', md: '64px' }}
        justify="space-between"
      >
        <HStack>
          <Text letterSpacing={1.4}> © {currentYear} </Text>
          <Text> Mutual Aid NYC</Text>
        </HStack>
        <HStack
          spacing={{ base: '16px', lg: '32px' }}
          // px={{ base: '16px', lg: '32px' }}
        >
          <LinkBox>
            <HStack spacing="8px">
              <EmailIcon />
              <LinkOverlay href={`mailto:info@mutualaid.nyc`}>
                Contact Us
              </LinkOverlay>
            </HStack>
          </LinkBox>
        </HStack>
      </Flex>
    </Stack>
  )
}
