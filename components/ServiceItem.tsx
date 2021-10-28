import { Box, BoxProps, Heading, Text } from '@chakra-ui/react'
import { Service } from '../models'

interface ServiceProps extends BoxProps {
  service: Service
}

export const ServiceItem = ({ service, ...props }: ServiceProps): JSX.Element => {
  return (
    <Box {...props}>
      <Heading fontSize="subheading2" mb="16px">{service.name}</Heading>
      <Text>{service.description}</Text>
    </Box>
  )
}