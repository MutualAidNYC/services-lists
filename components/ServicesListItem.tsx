import {
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

interface ServicesListItemProps extends LinkBoxProps {
  servicesList: ServicesList
}

export const ServicesListItem = ({ servicesList, ...props }: ServicesListItemProps): JSX.Element => {
  const taxonomies = [...new Set(servicesList.taxonomies)]

  return (
    <LinkBox {...props}>
      <Heading fontSize='subheading2' mb='16px'>
        <NextLink href={`/list/${encodeURIComponent(servicesList.id)}`} passHref>
          <LinkOverlay>
            {servicesList.name}
          </LinkOverlay>
        </NextLink>
      </Heading>
      <Text>{servicesList.description}</Text>
      <Text>{`Created by ${servicesList.creator} on ${formatDate(servicesList.createdAt)}`}</Text>
      <Wrap spacing='16px' mt='8px' align="center">
        {taxonomies.map((taxonomy, i) => (
          <Text
            key={i}
            bgColor='lightPink'
            borderRadius='15px'
            p='8px'
            maxW="240px"
            h="fit-content"
          >
            {taxonomy}
          </Text>
        ))}
      </Wrap>
    </LinkBox>
  )
}
