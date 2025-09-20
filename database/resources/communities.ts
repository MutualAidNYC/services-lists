import { Community } from 'models'
import { ResourcesAirtableClient } from '.'

export const selectAllCommunities = (
  filterFormula?: string
): Promise<Community[]> => {
  return ResourcesAirtableClient
    .selectAll<Community>(
      'taxonomy_terms', 
      filterFormula
    )
}
