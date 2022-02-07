import { AddIcon, EmailIcon, LinkIcon, PhoneIcon } from '@chakra-ui/icons'
import {
  Box,
  BoxProps,
  Button,
  Flex,
  Heading,
  HStack,
  LinkBox,
  LinkOverlay,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Service } from 'models'

interface AddServiceButtonProps {
  onAlertOpen: () => void
  service: Service
  setSelectedService: (service: Service) => void
}

const AddServiceButton = ({
  onAlertOpen,
  service,
  setSelectedService,
}: AddServiceButtonProps): JSX.Element => {
  const onAlertOpenWrapper = (): void => {
    setSelectedService(service)
    onAlertOpen()
  }

  return (
    <Button rightIcon={<AddIcon />} onClick={onAlertOpenWrapper} lineHeight="none">
      Add to list
    </Button>
  )
}


interface ServiceItemProps extends BoxProps {
  service: Service
  onAlertOpen?: () => void
  setSelectedService?: (service: Service) => void
}

export const ServiceItem = ({
  service,
  onAlertOpen,
  setSelectedService,
}: ServiceItemProps): JSX.Element => {
  return (
    <Box>
      <Flex mb="16px" alignItems="center" justifyContent="space-between">
        <LinkBox>
          <HStack spacing="8px">
            <LinkIcon />
            <LinkOverlay href={service.url}>
              <Heading fontSize="subheading2">{service.name}</Heading>
            </LinkOverlay>
          </HStack>
        </LinkBox>
        {onAlertOpen && setSelectedService && (
          <AddServiceButton
            onAlertOpen={onAlertOpen}
            service={service}
            setSelectedService={setSelectedService}
          />
        )}
      </Flex>
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
          </HStack>)}



      </Stack>
    </Box>

  )
}


/**

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
 */

