import { Need } from 'models'
import { ResourcesAirtableClient } from '.'
import { FieldSet } from 'airtable';

export const selectAllNeeds = (filterFormula?: string): Promise<FieldSet[]> => {
  const field = ResourcesAirtableClient.selectAll('taxonomy_terms', filterFormula)
  return field;
}
