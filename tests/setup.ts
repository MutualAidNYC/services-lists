import { server } from './mocks/server'

// Airtable API uses `fetch` which isn't available in Node so it must be mocked
require('jest-fetch-mock').enableMocks() // eslint-disable-line @typescript-eslint/no-var-requires

// establish API mocking before all tests
beforeAll(() => server.listen())

// reset any request handlers that we may add during the tests so they don't affect other tests
afterEach(() => server.resetHandlers())

// clean up after the tests are finished
afterAll(() => server.close())
