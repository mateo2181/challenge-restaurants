import type { Config } from 'jest';
import nextJest from 'next/jest';

const createJestConfig = nextJest({
    dir: "./",
});

// const customJestConfig = {
//   setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"], // <= setup file here 
//   testEnvironment: "jest-environment-jsdom",
// };

const config: Config = {
    coverageProvider: 'v8',
    testEnvironment: 'jsdom',
    verbose: true,
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
}

export default createJestConfig(config)