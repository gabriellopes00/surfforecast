const { resolve } = require('path')
const root = resolve(__dirname)

module.exports = {
  rootDir: root,
  displayName: 'root-tests',
  testEnvironment: 'node',
  collectCoverageFrom: [
    '<rootDir>/**/*.ts',
    '!<rootDir>/**/*.d.ts',
    '!<rootDir>/**/*-interface.ts',
    '!**/interfaces/**'
  ],
  coverageDirectory: './coverage',
  coverageProvider: 'v8',
  clearMocks: true,
  preset: 'ts-jest',
  moduleNameMapper: {
    '@src/(.*)': '<rootDir>/src/$1',
    '@tests/(.*)': '<rootDir>/tests/$1',
    '@config/(.*)': '<rootDir>/config/$1'
  }
}
