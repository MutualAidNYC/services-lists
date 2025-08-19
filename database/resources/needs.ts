import { Need } from 'models'
import { ResourcesAirtableClient } from '.'
import { FieldSet } from 'airtable';

export const selectAllNeeds = (filterFormula?: string): Promise<FieldSet[]> => {
  // TODO: Figure out how to get all needFocus options or create a needs focus table
  const field = ResourcesAirtableClient.selectAll('services', 'needFocus')
  return field;
}
