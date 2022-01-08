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
      <LinkBox mb="16px">
        <HStack spacing="8px">
          <LinkIcon />
          <LinkOverlay href={service.url}>
            <Heading fontSize="subheading2">{service.name}</Heading>
          </LinkOverlay>
        </HStack>
      </LinkBox>
      <Stack spacing="8px">
        <Text>{service.description}</Text>
        {service.email && (
          <LinkBox>
            <HStack spacing="8px">
              <EmailIcon />
              <LinkOverlay href={`mailto:${service.email}`}>
                {service.email}
              </LinkOverlay>
            </HStack>
          </LinkBox>
        )}
        {service.phoneNumbers && (
          <LinkBox>
            <HStack spacing="8px">
              <PhoneIcon />
              <LinkOverlay href={`tel:${service.phoneNumbers[0]}`}>
                {service.phoneNumbers[0]}
              </LinkOverlay>
            </HStack>
          </LinkBox>
        )}
        {service.taxonomyString && (
          <HStack>
            <Heading fontSize="subheading3">
              Resource categories:
            </Heading>
            {service.taxonomyString.map((taxonomy, i) => (
              <Text
                key={i}
                bgColor="lightPink"
                borderRadius="8px"
                p="8px"
              >
                {taxonomy}
              </Text>
            ))}
          </HStack>
        )}
      </Stack>
    </Box>
  )
}
