import Airtable, { Base } from 'airtable'
import { ObjectIndices } from '../models'

export class AirtableClient {
  base: Base

  constructor(apiKey: string, baseId: string) {
    this.base = new Airtable({apiKey: apiKey}).base(baseId)
  }

  async getById<T>(
    tableName: string,
    keys: (keyof T)[],
    id: string,
  ): Promise<T> {
    const record = await this.base.table(tableName).find(id)

    const object: {[key: string]: any} = {}
    keys.forEach(key => {
      object[key.toString()] = record.get(key.toString())
    })
    return object as T
  }

  async getAll<T>(
    tableName: string,
    keys: (keyof T)[],
    filter: string = '',
  ): Promise<T[]> {
    const objects: T[] = []

    const records = await this.base.table(tableName).select({
      filterByFormula: filter,
    }).all()

    // Map records to object specfied by keys
    records.forEach(record => {
      const object: {[key: string]: any} = {}
      keys.forEach(key => {
        object[key.toString()] = record.get(key.toString())
      })
      objects.push(object as T)
    })

    return objects as T[]
  }
}
