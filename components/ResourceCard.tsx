import { Stack, Text } from '@chakra-ui/react'
import { NO_ASSOCIATED_GROUP, Resource } from 'models'

export const ResourceCard = ({
  resource,
}: {
  resource: Resource
}): JSX.Element => {
  return (
    <Stack spacing="24px" p="24px">
      <Text fontSize="24px">{resource.title}</Text>
      {resource.groupName && resource.groupName != NO_ASSOCIATED_GROUP && (
        <Text>{resource.groupName}</Text>
      )}
      <Text>{resource.details}</Text>
    </Stack>
  )
}
