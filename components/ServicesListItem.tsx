import {
  Badge,
  Box,
  Heading,
  LinkBox,
  LinkBoxProps,
  LinkOverlay,
  Text,
  Wrap,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { ServicesList } from 'models'
import { formatDate } from 'utils'
import { ServiceListProvider } from 'hooks'


interface ServicesListItemProps extends LinkBoxProps {
  servicesList: ServicesList
}

export const ServicesListItem = ({ servicesList, ...props }: ServicesListItemProps): JSX.Element => {
  // Airtable taxonomies field contains duplicates
  const taxonomies = [...new Set(servicesList?.taxonomies)]

  return (
    <LinkBox {...props}>
      <Heading fontSize='subheading2' mb='16px'>
        <NextLink href={`/list/${encodeURIComponent(servicesList.id)}`} passHref>
          <LinkOverlay>
            {servicesList.name}
          </LinkOverlay>
        </NextLink>
        <Badge mx={4} px={2} py={1} rounded={16} colorScheme={servicesList.status == 'Published' ? 'green' : 'red'}>  draft </Badge>
      </Heading>
      <Text>{servicesList.description}</Text>
      <Text>{`Created by ${servicesList.creator} on ${formatDate(servicesList.createdAt)}`}</Text>
      <Box mt='8px' alignContent='center' w='100%' display='flex' flexDirection='row' maxW='3xl' h='100%'>

        {taxonomies.map((taxonomy, i) => (
          <Text
            key={i}
            mx={2}
            bgColor='lightPink'
            borderRadius='15px'
            p='8px'
            maxW="240px"
            h="fit-content"
          >
            {taxonomy}
          </Text>
        ))}
      </Box>
    </LinkBox>
  )
}
