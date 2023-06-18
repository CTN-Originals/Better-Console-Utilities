module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	testMatch: ['**/tests/**/*.test.ts'],
	collectCoverage: false,
	coverageReporters: ['lcov', 'text-summary'],
	roots: ['<rootDir>/tests', '<rootDir>/src'],
	testPathIgnorePatterns: ['/node_modules/', '/dist/', '/build/', '/coverage/', '/.vscode/'],
};
