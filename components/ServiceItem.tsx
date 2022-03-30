import { AddIcon, EmailIcon, LinkIcon, PhoneIcon } from '@chakra-ui/icons'
import {
  Box,
  BoxProps,
  Button,
  Heading,
  HStack,
  LinkBox,
  LinkOverlay,
  Stack,
  Text,
} from '@chakra-ui/react'
import { TaxonomySection } from 'components'
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
    <Button
      rightIcon={<AddIcon />}
      onClick={onAlertOpenWrapper}
      lineHeight="none"
      w={{ base: '100%', sm: 'auto' }}
      minW="fit-content"
    >
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
    <Box boxShadow="md" rounded="lg" p="8" _hover={{ boxShadow: 'lg' }}>
      <Stack
        direction={{ base: 'column', sm: 'row' }}
        align="center"
        justifyContent="space-between"
        mb="16px"
      >
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
      </Stack>
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
          <TaxonomySection taxonomies={service.taxonomyString} />
        )}
      </Stack>
    </Box>
  )
}
