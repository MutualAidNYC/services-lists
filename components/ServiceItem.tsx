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
import { Address, Resource } from 'models'
import { TaxonomySection } from './TaxonomySection'

interface AddServiceButtonProps {
  onAlertOpen: () => void
  service: Resource
  setSelectedService: (service: Resource) => void
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
  selectedAddress: Address | undefined
  setSelectedAddress: (address: Address | undefined) => void
  getAddress: (service: Resource) => Address | undefined
  service: Resource
}

const SearchAddressIcon = ({
  selectedAddress,
  setSelectedAddress,
  getAddress,
  service,
}: SearchAddressIconProps): JSX.Element => {
  const handleClick = () => {
    const address = getAddress(service)
    if (address) {
      if (selectedAddress === address) {
        setSelectedAddress(undefined)
      } else {
        setSelectedAddress(address)
      }
    }
  }

  return (
    <Box>
      {selectedAddress &&
      getAddress(service) &&
      selectedAddress === getAddress(service) ? (
        <ViewOffIcon onClick={() => handleClick()} />
      ) : (
        <ViewIcon onClick={() => handleClick()} />
      )}
    </Box>
  )
}

interface ServiceItemProps extends BoxProps {
  service: Resource
  onAlertOpen?: () => void
  setSelectedService?: (service: Resource) => void
  selectedAddress?: Address | undefined
  setSelectedAddress?: (address: Address | undefined) => void
  getAddress?: (service: Resource) => Address | undefined
}

export const ServiceItem = ({
  service,
  onAlertOpen,
  setSelectedService,
  selectedAddress,
  setSelectedAddress,
  getAddress,
}: ServiceItemProps): JSX.Element => {
  const needs = service.needs.split(',')

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
            <LinkOverlay href={service.link}>
              <Heading fontSize="subheading2">{service.title}</Heading>
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
      <Text>Group: {service.group}</Text>
      <Text>{service.details}</Text>
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
      {service.phone && (
        <LinkBox>
          <HStack spacing="8px">
            <PhoneIcon />
            <LinkOverlay href={`tel:${service.phone}`}>
              {service.phone}
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
        {service.needs && <TaxonomySection taxonomies={needs} />}
        {service.address && setSelectedAddress && getAddress && (
          <SearchAddressIcon
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
            getAddress={getAddress}
            service={service}
          />
        )}
      </Box>
    </Stack>
  )
}
