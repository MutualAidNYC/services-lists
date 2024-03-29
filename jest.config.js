/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^apiFunctions': '<rootDir>/apiFunctions/index',
    '^database': '<rootDir>/database/index',
    '^hooks': '<rootDir>/hooks/index',
    '^utils': '<rootDir>/utils/index',
  },
  globalSetup: '<rootDir>/tests/globalSetup.ts',
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.test.json',
    },
  },
}
