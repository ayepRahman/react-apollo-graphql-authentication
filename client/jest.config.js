const path = require('path');

module.exports = {
  roots: ['<rootDir>/src'],
  verbose: true,
  bail: true,
  moduleDirectories: ['node_modules', path.join(__dirname, 'src')],
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
  collectCoverageFrom: ['src/app/**/*.{js,jsx,ts,tsx}'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -10,
    },
  },
  displayName: {
    name: 'CLIENT',
    color: 'cyan',
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
