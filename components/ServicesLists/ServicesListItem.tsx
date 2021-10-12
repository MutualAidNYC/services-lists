import {
  Box,
  BoxProps,
  Heading,
  HStack,
  Text,
} from '@chakra-ui/react'
import { ServicesList } from '../../models'

interface ServicesListItemProps extends BoxProps {
  servicesList: ServicesList
}

export const ServicesListItem = ({ servicesList, ...props }: ServicesListItemProps): JSX.Element => {
  return (
    <Box {...props}>
      <Heading fontSize='subheading2' mb='16px'>{servicesList.name}</Heading>
      <Text>{servicesList.description}</Text>
      <HStack spacing='16px' mt='8px'>
        {servicesList.taxonomies?.map((taxonomy, i) => (
          <Text
            key={i}
            bgColor='lightPink'
            borderRadius='15px'
            p='8px'
          >
            {taxonomy}
          </Text>
        ))}
      </HStack>
    </Box>
  )
}
