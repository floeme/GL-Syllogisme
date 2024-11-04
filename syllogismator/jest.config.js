// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',  // Use jsdom for DOM APIs
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // Transpile TypeScript using ts-jest
  }
};