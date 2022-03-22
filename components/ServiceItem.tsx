import {
  AddIcon,
  EmailIcon,
  LinkIcon,
  MinusIcon,
  PhoneIcon,
  Search2Icon,
} from '@chakra-ui/icons'
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
  Tooltip,
  Wrap,
} from '@chakra-ui/react'
import { Address, Service } from 'models'

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
      colorScheme={'teal'}
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
        <MinusIcon onClick={() => handleClick()} />
      ) : (
        <Search2Icon onClick={() => handleClick()} />
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
  const adjustName = (name: string, length: number) => {
    if (name.length >= length) {
      return name.substring(0, length - 2).replaceAll(',', '') + '...'
    }
    return name
  }

  return (
    <Box
      boxShadow="md"
      rounded="lg"
      px={2}
      py={8}
      _hover={{ boxShadow: 'lg' }}
      w="100%"
      minW="100%"
    >
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

        <Box
          maxW='100%'
          w="3xl"
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
        >
          {service.taxonomyString && (
            <Wrap>
              {service.taxonomyString.map((taxonomy, i) => (
                <Tooltip label={taxonomy} rounded="xl" key={i}>
                  <Text
                    textAlign="center"
                    bgColor="lightPink"
                    borderRadius="8px"
                    p="8px"
                  >
                    {adjustName(taxonomy, 18)}
                  </Text>
                </Tooltip>
              ))}
            </Wrap>
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
    </Box>
  )
}
