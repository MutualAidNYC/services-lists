import {
  Box,
  BoxProps,
  Heading,
  Link,
  Stack,
  Text,
  Tooltip,
  Wrap,
} from '@chakra-ui/react'
import { ServicesList } from 'models'
import { formatDate } from 'utils'

interface ServicesListItemProps extends BoxProps {
  servicesList: ServicesList
}

export const ServicesListItem = ({
  servicesList,
  ...props
}: ServicesListItemProps): JSX.Element => {
  // Airtable taxonomies field contains duplicates
  const taxonomies = [...new Set(servicesList?.taxonomies)]

  const adjustName = (name: string, length: number) => {
    if (name.length >= length) {
      return name.substring(0, length - 2).replaceAll(',', '') + '...'
    }
    return name
  }

  return (
    <Box {...props}>
      <Heading fontSize="subheading2" mb="16px">
        <Link href={`/list/${servicesList.id}`}>{servicesList.name}</Link>
      </Heading>
      <Stack spacing="8px">
        <Text>{servicesList.description}</Text>
        <Text>{`Created by ${servicesList.creator} on ${formatDate(
          servicesList.createdAt
        )}`}</Text>
        <Wrap>
          {taxonomies.map((taxonomy, i) => (
            <Tooltip label={taxonomy} rounded="xl" key={i}>
              <Text
                mx={2}
                bgColor="lightPink"
                borderRadius="15px"
                p="8px"
                textAlign="center"
                maxW="240px"
                height="fit-content"
              >
                {adjustName(taxonomy, 18)}
              </Text>
            </Tooltip>
          ))}
        </Wrap>
      </Stack>
    </Box>
  )
}
