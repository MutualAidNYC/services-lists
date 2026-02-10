import Airtable, { Base, FieldSet } from 'airtable'
import { QueryParams } from 'airtable/lib/query_params'

interface AirtableCreateObject<T> {
  fields: T
}

export interface AirtableCreateResponse {
  id: string
}

export class AirtableClient {
  private readonly base: Base

  constructor(apiKey: string, baseId: string) {
    this.base = new Airtable({ apiKey: apiKey }).base(baseId)
  }

  async create<T extends FieldSet>(
    tableName: string,
    recordObjects: AirtableCreateObject<T>[]
  ): Promise<AirtableCreateResponse[]> {
    const records = await this.base<T>(tableName).create(recordObjects)

    return records.map((record) => {
      return {
        id: record.id,
      }
    })
  }

  async find<T extends FieldSet>(tableName: string, id: string): Promise<T> {
    const record = await this.base.table<T>(tableName).find(id)
    return record.fields
  }

  async selectAll<T extends FieldSet>(
    tableName: string,
    filterFormula = ''
  ): Promise<T[]> {
    const records = await this.base<T>(tableName)
      .select({
        filterByFormula: filterFormula,
      })
      .all()
    return records.map((record) => record.fields)
  }

}
