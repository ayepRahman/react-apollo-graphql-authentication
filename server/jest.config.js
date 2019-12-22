const path = require('path');

module.exports = {
  roots: ['<rootDir>/src'],
  verbose: true,
  bail: true,
  moduleDirectories: ['node_modules', path.join(__dirname, 'src')],
  moduleFileExtensions: ['js', 'json', 'ts', 'node'],
  collectCoverageFrom: ['src/app/**/*.{js,ts}'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -10,
    },
  },
  displayName: {
    name: 'SERVER',
    color: 'orange',
  },
  // Jest transformations -- this adds support for TypeScript
  // using ts-jest
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  // when using React Testing Library and adds special
  // extended assertions to Jest
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect', 'jest-styled-components'],
};
