import Airtable,  { Base }  from 'airtable'

export class AirtableClient {
  base: Base

  constructor(apiKey: string, baseId: string) {
    this.base = new Airtable({ apiKey: apiKey }).base(baseId)
  }

  async getById<T>(
    tableName: string,
    id: string,
  ): Promise<T> {
    const record = await this.base.table(tableName).find(id)
    return record.fields as unknown as T
  }

  async getAll<T extends object>(
    tableName: string,
    filter: string = '',
  ): Promise<T[]> {
    const records = await this.base.table(tableName).select({
      filterByFormula: filter,
    }).all()

    return records.map(record => record.fields) as T[]
  }

  async createRows<T extends object>(
    tableName: string,
    recordData: any[], 
  ): Promise<T[]> {
    const records = await this.base(tableName).create(recordData)
    return records.map(record => record.fields) as T[]
  }
}