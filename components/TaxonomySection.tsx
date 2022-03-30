import { Badge, Tooltip, Wrap, WrapProps } from '@chakra-ui/react'
import { trimString } from 'utils'

const maxTaxonomyLength = 20

interface TaxonomySectionProps extends WrapProps {
  taxonomies: string[]
}

export const TaxonomySection = ({
  taxonomies,
  ...props
}: TaxonomySectionProps): JSX.Element => {
  return (
    <Wrap {...props}>
      {taxonomies.map((taxonomy, i) => (
        <Tooltip
          key={i}
          label={taxonomy.length > maxTaxonomyLength ? taxonomy : undefined}
          borderRadius="16px"
        >
          <Badge bgColor="lightPink" borderRadius="16px" p="8px">
            {trimString(taxonomy, maxTaxonomyLength)}
          </Badge>
        </Tooltip>
      ))}
    </Wrap>
  )
}
