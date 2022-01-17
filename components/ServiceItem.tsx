import { EmailIcon, LinkIcon, PhoneIcon } from '@chakra-ui/icons'
import {
  Box,
  BoxProps,
  Heading,
  HStack,
  LinkBox,
  LinkOverlay,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Address, Service } from '../models'

interface ServiceProps extends BoxProps {
  service: Service
  address?: Address
}

export const ServiceItem = ({
  service,
  address,
  ...props
}: ServiceProps): JSX.Element => {





  return (
    <Box {...props}>
      <Box boxShadow='md' rounded='lg' p='8' _hover={{ border: '2px', borderColor: 'teal' }} >
        <LinkBox mb="16px">
          <HStack spacing="8px">
            <LinkIcon />
            <LinkOverlay href={service.url} _hover={{ textDecoration: 'underline' }}>
              <Heading fontSize="subheading2"   >{service.name}</Heading>
            </LinkOverlay>
          </HStack>
        </LinkBox>
        <Stack spacing="8px">
          {service.address && (
            <LinkBox>
              <HStack spacing="8px">

                <Text _hover={{ textDecoration: 'underline' }} >
                  {address?.address_1}
                </Text>
              </HStack>
            </LinkBox>
          )}
          <Text>{service.description}</Text>
          {service.email && (
            <LinkBox>
              <HStack spacing="8px">
                <EmailIcon />
                <LinkOverlay href={`mailto:${service.email}`} _hover={{ textDecoration: 'underline' }} >
                  {service.email}
                </LinkOverlay>
              </HStack>
            </LinkBox>
          )}
          {service.phoneNumbers && (
            <LinkBox>
              <HStack spacing="8px">
                <PhoneIcon />
                <LinkOverlay href={`tel:${service.phoneNumbers[0]}`} _hover={{ textDecoration: 'underline' }}>
                  {service.phoneNumbers[0]}
                </LinkOverlay>
              </HStack>
            </LinkBox>
          )}

        </Stack>
      </Box>

    </Box>
  )
}

