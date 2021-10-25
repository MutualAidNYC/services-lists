import {
  BoxProps,
  Heading,
  HStack,
  Text,
  Image,
  VStack
} from '@chakra-ui/react'
import Link from 'next/link'
import { ServicesList } from '../../models'

interface ServicesListItemProps extends BoxProps {
  servicesList: ServicesList
}

export const ServicesListItem = ({ servicesList, ...props }: ServicesListItemProps): JSX.Element => {
  return (
    <HStack {...props} >
      <Link href={'/lists/' + servicesList.name.replaceAll(" ", "")} >
        <HStack _hover={{bg: "gray.200"}} minWidth='50%'>
          <Image boxSize='120px' src='' />
          <VStack spacing={0} align='flex-start'>
            <Heading fontSize='subheading2' mb='12px'>{servicesList.name}</Heading>
            <Text>{servicesList.description}</Text>
            <HStack spacing='16px' mt='16px'>
              {servicesList.taxonomies?.map((taxonomy, i) => (
                <Text
                  key={i}
                  bgColor='#619E99'
                  borderRadius='15px'
                  p='8px'
                >
                  {taxonomy}
                </Text>
              ))}
            </HStack>
          </VStack>
        </HStack>
      </Link>
    </HStack>
  )
}

/**
 * Possible Colors For Taxonomy Text
 * #619E99
 * #619E7A
 */