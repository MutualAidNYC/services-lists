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
  Stack,
  Text,
} from '@chakra-ui/react'
import { MapMarkerAddress, Service } from 'models'
import { TaxonomySection } from './TaxonomySection'
import { isValidUrl } from 'utils'
import { useMemo } from 'react'

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
  selectedAddress: MapMarkerAddress | undefined
  setSelectedMapMarkerAddress: (address: MapMarkerAddress | undefined) => void
  getMapMarkerAddress: (service: Service) => MapMarkerAddress | undefined
  service: Service
}

const SearchAddressIcon = ({
  selectedAddress,
  setSelectedMapMarkerAddress,
  getMapMarkerAddress,
  service,
}: SearchAddressIconProps): JSX.Element => {
  const handleClick = () => {
    const address = getMapMarkerAddress(service)
    if (address) {
      if (selectedAddress === address) {
        setSelectedMapMarkerAddress(undefined)
      } else {
        setSelectedMapMarkerAddress(address)
      }
    }
  }

  return (
    <Box>
      {selectedAddress &&
      getMapMarkerAddress(service) &&
      selectedAddress === getMapMarkerAddress(service) ? (
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
  selectedAddress?: MapMarkerAddress | undefined
  setSelectedAddress?: (address: MapMarkerAddress | undefined) => void
  getMapMarkerAddress?: (service: Service) => MapMarkerAddress | undefined
}

export const ServiceItem = ({
  service,
  onAlertOpen,
  setSelectedService,
  selectedAddress,
  setSelectedAddress,
  getMapMarkerAddress,
}: ServiceItemProps): JSX.Element => {

  const urlIsValid = useMemo( () => isValidUrl( service.url ), [service.url] );

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
		<HStack spacing="8px">
			{ urlIsValid ? <LinkIcon /> : null }
			<Heading fontSize="subheading2">
				{ urlIsValid ? (<a href={service.url}>{service.name}</a>) : service.name }
			</Heading>
		</HStack>
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
		<HStack spacing="8px">
			<EmailIcon />
			<a href={`mailto:${service.email}`}>
				{service.email}
			</a>
		</HStack>
      )}
      {service.phoneNumbers && (
		<HStack spacing="8px">
			<PhoneIcon />
			<a href={`tel:${service.phoneNumbers}`}>
				{service.phoneNumbers}
			</a>
		</HStack>
      )}
      <Box
        maxW="100%"
        w="3xl"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
      >
        {service.needFocus && <TaxonomySection taxonomies={service.needFocus} />}
        {service['x-streetAddress'] && setSelectedAddress && getMapMarkerAddress && (
          <SearchAddressIcon
            selectedAddress={selectedAddress}
            setSelectedMapMarkerAddress={setSelectedAddress}
            getMapMarkerAddress={getMapMarkerAddress}
            service={service}
          />
        )}
      </Box>
    </Stack>
  )
}
