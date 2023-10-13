import Airtable from 'airtable'
import { QueryParams } from 'airtable/lib/query_params'

export class AirtableClient {
  private readonly base: Airtable.Base

  constructor(apiKey: string, baseId: string) {
    this.base = new Airtable({ apiKey: apiKey }).base(baseId)
  }

  async create<T extends Airtable.FieldSet>(
    tableName: string,
    recordsData: { fields: Partial<T> }[]
  ): Promise<Airtable.Records<T>> {
    return this.base<T>(tableName).create(recordsData)
  }

  async find<T extends Airtable.FieldSet>(
    tableName: string,
    id: string
  ): Promise<Airtable.Record<T>> {
    return this.base.table<T>(tableName).find(id)
  }

  async selectAll<T extends Airtable.FieldSet>(
    tableName: string,
    queryParams?: QueryParams<T>
  ): Promise<Airtable.Records<T>> {
    return this.base<T>(tableName).select(queryParams).all()
  }
}
