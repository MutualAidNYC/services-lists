import { EmailIcon } from '@chakra-ui/icons'
import {
  Flex,
  HStack,
  LinkBox,
  LinkOverlay,
  Text,
} from '@chakra-ui/react'

export const Footer = (): JSX.Element => {
  return (
    <Flex
      alignItems="center"
      bgColor="#204045"
      color="white"
      p="8px"
      mt="16px"
      w="100%"
      justify="space-between"
    >
        <HStack>
          <Text letterSpacing={1.4}> © 2022 </Text>
          <Text> Mutual Aid NYC</Text>
        </HStack>
      <HStack
        spacing={{ base: '16px', lg: '32px' }}
        px={{ base: '16px', lg: '32px' }}
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
  )
}
