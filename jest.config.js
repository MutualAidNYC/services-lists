/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^apiFunctions$': '<rootDir>/apiFunctions/index',
    '^database$': '<rootDir>/database/index',
    '^hooks$': '<rootDir>/hooks/index',
    '^utils$': '<rootDir>/utils/index', // base import
    '^utils/(.*)$': '<rootDir>/utils/$1', // nested imports
    '^components$': '<rootDir>/components/index',
    '^models$': '<rootDir>/models/index',  // base import
    '^models/(.*)$': '<rootDir>/models/$1', // nested imports
  },
  globalSetup: '<rootDir>/tests/globalSetup.ts',
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.test.json',
    },
  },
}
