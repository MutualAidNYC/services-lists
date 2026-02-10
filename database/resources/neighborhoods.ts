import { Neighborhood } from 'models'
import { ResourcesAirtableClient } from '.'

export const selectAllNeighborhoods = (
  filterFormula?: string
): Promise<Neighborhood[]> => {
  return ResourcesAirtableClient.selectAll<Neighborhood>(
    'X-Neighborhoods',
    filterFormula
  )
}
