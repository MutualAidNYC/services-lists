import { HStack, IconButton, Link, Stack, Text } from '@chakra-ui/react'
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
      border="1px"
      borderRadius="8px"
      p="24px"
      height="100%"
      direction="column"
      justify="space-between"
    >
      <Stack spacing="24px">
        <Text fontSize="24px">{resource.title}</Text>
        {resource.groupName && resource.groupName != NO_ASSOCIATED_GROUP && (
          <Text>{resource.groupName}</Text>
        )}
        <Text overflowWrap="anywhere">{resource.details}</Text>
      </Stack>
      <HStack>
        <IconButton
          aria-label="Save resource"
          icon={<Bookmark />}
          onClick={saveResource}
        />
        {resource.link && (
          <IconButton
            isExternal
            aria-label=""
            as={Link}
            href={resource.link}
            icon={<ExternalLink />}
          />
        )}
      </HStack>
    </Stack>
  )
}
