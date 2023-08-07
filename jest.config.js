// /** @type {import('ts-jest').JestConfigWithTsJest} */
// module.exports = {
//   preset: 'ts-jest',
//   testEnvironment: 'jest-environment-jsdom',
//   //testEnvironment: 'jsdom',
//   //testEnvironment: 'node',
//   globals: {
//     'ts-jest': {
//       tsconfig: './tsconfig.jest.json'
//     }
//   }
// };

//const nextJest = import('ts-jest')
//const nextJest = import('ts-jest').JestConfigWithTsJest

// import type { JestConfigWithTsJest } from 'ts-jest'
const nextJest = require('next/jest')
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  preset: 'ts-jest',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/pages/(.*)$': '<rootDir>/pages/$1'
  },
  // globals: {
  //   'ts-jest': {
  //     tsconfig: './tsconfig.jest.json'
  //   }
  // },
  testEnvironment: 'jest-environment-jsdom',
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)