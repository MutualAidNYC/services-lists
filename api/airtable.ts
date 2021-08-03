import Airtable, { Base } from 'airtable'

export class AirtableClient {
  base: Base

  constructor(apiKey: string, baseId: string) {
    this.base = new Airtable({apiKey: apiKey}).base(baseId)
  }

  async getById<O extends object>(tableName: string, keys: (keyof O)[], id: string): Promise<O> {
    const record = await this.base.table(tableName).find(id)

    const object = {} as O
    keys.forEach(key => {
      object[key.toString()] = record.get(key.toString())
    })
    return object
  }

  async get<O extends object>(tableName: string, keys: (keyof O)[],  filter?: string): Promise<O[]> {
    let objects: O[] = []

    await this.base.table(tableName).select({
      filterByFormula: filter ? filter : ''
    }).eachPage(
      (records, processNextPage) => {
        records.forEach(record => {
          const object = {} as O
          keys.forEach(key => {
            object[key.toString()] = record.get(key.toString())
          })
          objects.push(object)
        })

        processNextPage()
      }
    )

    return objects
  }
}
