/** @type {import('@stryker-mutator/api/core').StrykerOptions} */
module.exports = {
  packageManager: 'pnpm',

  plugins: ['@stryker-mutator/jest-runner', '@stryker-mutator/typescript-checker'],
  checkers: ['typescript'],
  tsconfigFile: 'tsconfig.json',

  testRunner: 'jest',
  testRunnerNodeArgs: ['--experimental-vm-modules'],

  reporters: ['clear-text', 'html'],
  coverageAnalysis: 'off',
  mutate: ['src/workouts/workouts.service.ts'],

  jest: {
    configFile: 'jest.config.cjs',
  },
};
