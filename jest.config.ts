module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: './',
  testMatch: ['**/tests/**/*.test.ts'],
  moduleFileExtensions: ['js', 'ts', 'json'],
  setupFilesAfterEnv: ['./tests/setup.ts'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json'
    }
  },
}
