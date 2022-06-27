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
  Link,
  LinkBox,
  LinkOverlay,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Address, Service } from 'models'
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
  selectedAddress: Address | undefined
  setSelectedAddress: (address: Address | undefined) => void
  getAddress: (service: Service) => Address | undefined
  service: Service
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
  service: Service
  onAlertOpen?: () => void
  setSelectedService?: (service: Service) => void
  selectedAddress?: Address | undefined
  setSelectedAddress?: (address: Address | undefined) => void
  getAddress?: (service: Service) => Address | undefined
}

export const ServiceItem = ({
  service,
  onAlertOpen,
  setSelectedService,
  selectedAddress,
  setSelectedAddress,
  getAddress,
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
      {service.organizationNames && service.organizationUrls && (
        <Text>
          Group:{' '}
          <Link href={service.organizationUrls[0]} textDecor="underline">
            {service.organizationNames[0]}
          </Link>
        </Text>
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
            <LinkOverlay href={`tel:${service.phoneNumbers[0]}`}>
              {service.phoneNumbers[0]}
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
        {service.taxonomyString && (
          <TaxonomySection taxonomies={service.taxonomyString} />
        )}
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
