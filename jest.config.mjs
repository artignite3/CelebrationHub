// Jest through next/jest: Next's own SWC compiles TS and TSX, and loads .env files for tests
import nextJest from "next/jest.js"

const createJestConfig = nextJest({ dir: "./" })

export default createJestConfig({
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: { "^@/(.*)$": "<rootDir>/$1" },
  testPathIgnorePatterns: ["/node_modules/", "/.next/", "/.history/"],
  modulePathIgnorePatterns: ["<rootDir>/.history/", "<rootDir>/.next/"],
})
