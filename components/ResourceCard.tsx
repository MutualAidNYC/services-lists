import {
  Heading,
  HStack,
  IconButton,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react'
import { NO_ASSOCIATED_GROUP, Resource } from 'models'
import { Bookmark, ExternalLink } from 'react-feather'

export const ResourceCard = ({
  resource,
  saveResource,
}: {
  resource: Resource
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
        <Heading fontSize="2xl">{resource.title}</Heading>
        {resource.groupName && resource.groupName != NO_ASSOCIATED_GROUP && (
          <Text fontSize="xl" fontWeight="semibold" color="Gray.900">
            {resource.groupName}
          </Text>
        )}
        <Text overflowWrap="anywhere">{resource.details}</Text>
      </Stack>
      <HStack spacing="12px">
        <IconButton
          aria-label="Save resource"
          icon={<Bookmark />}
          onClick={saveResource}
          variant="outline"
        />
        {resource.link && (
          <IconButton
            isExternal
            aria-label=""
            as={Link}
            href={resource.link}
            icon={<ExternalLink />}
            variant="outline"
          />
        )}
      </HStack>
    </Stack>
  )
}
