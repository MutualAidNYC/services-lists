import Airtable from 'airtable'
import Base from 'airtable/lib/base';
import Record from 'airtable/lib/record';
import Table from 'airtable/lib/table';

export class AirtableClient {
  base: {
    (tableName: string): Table;
    _base: Base;
    getId(): string;
    makeRequest(options: {
        method?: string;
        path?: string;
        qs?: globalThis.Record<string, any>;
        headers?: globalThis.Record<string, any>;
        body?: globalThis.Record<string, any>;
        _numAttempts?: number;
    }): Promise<Response & {
        statusCode: number;
    }>;
    table(tableName: string): Table;
  }

  constructor(apiKey: string, baseId: string) {
    this.base = new Airtable({apiKey: apiKey}).base(baseId)
  }

  async get<O extends object>(tableName: string, keys: (keyof O)[],  filter?: string): Promise<O[]> {
    let objects: O[] = []

    await this.base.table(tableName).select({
      filterByFormula: filter ? filter : ''
    }).eachPage(
      (records: Record[], fetchNextPage: () => void) => {
        records.forEach(record => {
          const object = {} as O
          keys.forEach(key => {
            object[key.toString()] = record.get(key.toString())
          })
          objects.push(object)
        })

        fetchNextPage()
      },
    )

    return objects
  }
}
