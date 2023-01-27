import { MinusIcon } from '@chakra-ui/icons'
import { Flex, IconButton, Text } from '@chakra-ui/react'
import { useCreateListContext } from 'hooks'
import { Resource } from 'models'

interface CreateListItemProps {
  service: Resource
}

export const CreateListItem = ({
  service,
}: CreateListItemProps): JSX.Element => {
  const { removeServiceFromList } = useCreateListContext()

  return (
    <Flex alignItems="center" justifyContent="space-between">
      <Text>{service.title}</Text>
      <IconButton
        aria-label="Remove resource from list"
        icon={<MinusIcon />}
        onClick={() => removeServiceFromList(service.id)}
      />
    </Flex>
  )
}
