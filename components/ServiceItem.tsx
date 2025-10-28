import {
  AddIcon,
  EmailIcon,
  LinkIcon,
  PhoneIcon,
  ViewIcon,
  ViewOffIcon,
} from '@chakra-ui/icons'
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
import { AddressWithLabel, Resource, Service } from 'models'
import { TaxonomySection } from './TaxonomySection'

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

interface SearchAddressIconProps {
  selectedAddress: AddressWithLabel | undefined
  setSelectedAddressWithLabel: (address: AddressWithLabel | undefined) => void
  getAddressWithLabel: (service: Service) => AddressWithLabel | undefined
  service: Service
}

const SearchAddressIcon = ({
  selectedAddress,
  setSelectedAddressWithLabel,
  getAddressWithLabel,
  service,
}: SearchAddressIconProps): JSX.Element => {
  const handleClick = () => {
    const address = getAddressWithLabel(service)
    if (address) {
      if (selectedAddress === address) {
        setSelectedAddressWithLabel(undefined)
      } else {
        setSelectedAddressWithLabel(address)
      }
    }
  }

  return (
    <Box>
      {selectedAddress &&
      getAddressWithLabel(service) &&
      selectedAddress === getAddressWithLabel(service) ? (
        <ViewOffIcon onClick={() => handleClick()} />
      ) : (
        <ViewIcon onClick={() => handleClick()} />
      )}
    </Box>
  )
}

interface ServiceItemProps extends BoxProps {
  service: Service
  onAlertOpen?: () => void
  setSelectedService?: (service: Service) => void
  selectedAddress?: AddressWithLabel | undefined
  setSelectedAddress?: (address: AddressWithLabel | undefined) => void
  getAddressWithLabel?: (service: Service) => AddressWithLabel | undefined
}

export const ServiceItem = ({
  service,
  onAlertOpen,
  setSelectedService,
  selectedAddress,
  setSelectedAddress,
  getAddressWithLabel,
}: ServiceItemProps): JSX.Element => {
  return (
    <Stack
      spacing="8px"
      boxShadow="md"
      rounded="lg"
      p="8"
      _hover={{ boxShadow: 'lg' }}
    >
      <Stack
        direction={{ base: 'column', sm: 'row' }}
        align="center"
        justifyContent="space-between"
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
      {service.organizations && !service.organizations.includes('-No Associated Group') && (
        <Text>Group: {service.groupName}</Text>
      )}
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
            <LinkOverlay href={`tel:${service.phoneNumbers}`}>
              {service.phoneNumbers}
            </LinkOverlay>
          </HStack>
        </LinkBox>
      )}
      <Box
        maxW="100%"
        w="3xl"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
      >
        {service.needFocus && <TaxonomySection taxonomies={service.needFocus} />}
        {service['x-streetAddress'] && setSelectedAddress && getAddressWithLabel && (
          <SearchAddressIcon
            selectedAddress={selectedAddress}
            setSelectedAddressWithLabel={setSelectedAddress}
            getAddressWithLabel={getAddressWithLabel}
            service={service}
          />
        )}
      </Box>
    </Stack>
  )
}
