import { Need } from 'models'
import { ResourcesAirtableClient } from '.'

export const selectAllNeeds = (
  filterFormula?: string
): Promise<Need[]> => {
  return ResourcesAirtableClient
    .selectAll<Need>(
      'taxonomy_terms', 
      filterFormula
    )
}
