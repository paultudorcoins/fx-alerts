import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',                 // compile TypeScript inside tests
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',  // resolves "@/lib/..." aliases
  },
  testMatch: ['**/__tests__/**/*.test.ts'],
};

export default config;
