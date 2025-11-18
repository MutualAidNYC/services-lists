import {
  HStack,
  Heading,
  IconButton,
  Link,
  Stack,
  Text
} from '@chakra-ui/react'
import dayjs from 'dayjs'
import { NO_ASSOCIATED_GROUP, Service } from 'models'
import { ExternalLink, PlusCircle } from 'react-feather'

export const ResourceCard = ({
  service,
  saveResource,
}: {
  service: Service
  saveResource: () => void
}): JSX.Element => {
  return (
    <Stack
      spacing="24px"
      border="1px solid #EAECF0"
      borderRadius="8px"
      boxShadow="0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)"
      p="24px"
      height="100%"
      direction="column"
      justify="space-between"
    >
      <Stack spacing="24px">
        {service.url ? (<Heading fontSize="2xl"><Link href={service.url}>{service.name}</Link></Heading>):(<Heading fontSize="2xl">{service.name}</Heading>)}
      
        {service.groupName && service.groupName.every(name => name != NO_ASSOCIATED_GROUP) && (
          <Text fontSize="xl" fontWeight="semibold" color="Gray.900">
            {service.groupName}
          </Text>
        )}
        {service.needFocus && (
          <Text fontSize="xl" fontWeight="semibold" color="Gray.900">
            {`Need: ${service.needFocus[0]}`}
          </Text>
        )}
        <Text>
          {`Last Modified: ${dayjs(service.last_modified).format(
            'DD MMM YYYY, h:mm a'
          )}`}
          <br />
          {`Created Time: ${dayjs(service.Created).format(
            'DD MMM YYYY, h:mm a'
          )}`}
        </Text>
        <Text
          overflowWrap="anywhere"
          overflowY="scroll"
          maxHeight={300}
          css={{
            '&::-webkit-scrollbar': {
              width: '4px',
            },
            '&::-webkit-scrollbar-track': {
              width: '6px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'grey',
              borderRadius: '24px',
            },
          }}
        >
          {service.description}
        </Text>
      </Stack>
      <HStack spacing="12px">
        <IconButton
          aria-label="Save resource"
          icon={<PlusCircle/>}
          onClick={saveResource}
          variant="outline"
        />
        {service.url && (
          <IconButton
            isExternal
            aria-label=""
            as={Link}
            href={service.url}
            icon={<ExternalLink />}
            variant="outline"
          />
        )}
      </HStack>
    </Stack>
  )
}
