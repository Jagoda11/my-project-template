module.exports = {
  testMatch: ['**/*.test.ts'],
  moduleDirectories: ['node_modules', 'src'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/playwright-tests/',
    '/cypress-tests/',
    '/dist/',
  ],
}
