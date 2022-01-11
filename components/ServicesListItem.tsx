import {
  Heading,
  HStack,
  LinkBox,
  LinkBoxProps,
  LinkOverlay,
  Text,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { ServicesList } from '../models'

interface ServicesListItemProps extends LinkBoxProps {
  servicesList: ServicesList
}

export const ServicesListItem = ({ servicesList, ...props }: ServicesListItemProps): JSX.Element => {
  const taxonomiesList = [...new Set(servicesList.taxonomies)]
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
      <HStack spacing='16px' mt='8px'>
        {taxonomiesList?.map((taxonomy, i) => (
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
    </LinkBox>
  )
}
