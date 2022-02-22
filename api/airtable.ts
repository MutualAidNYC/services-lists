import Airtable, { Base } from 'airtable'

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

  async getById<T>(tableName: string, id: string): Promise<T> {
    const record = await this.base.table(tableName).find(id)
    return record.fields as unknown as T
  }

  async getAll<T extends object>(tableName: string, filter = ''): Promise<T[]> {
    const records = await this.base
      .table(tableName)
      .select({
        filterByFormula: filter,
      })
      .all()

    return records.map((record) => record.fields) as T[]
  }

  async createRecords<T>(
    tableName: string,
    recordObjects: AirtableCreateObject<T>[]
  ): Promise<AirtableCreateResponse[]> {
    const records = await this.base(tableName).create(recordObjects)

    return records.map((record) => {
      return {
        id: record.id,
      }
    })
  }
}
