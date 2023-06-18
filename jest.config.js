module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	testMatch: ['**/tests/**/*.test.ts'],
	collectCoverage: false,
	coverageReporters: ['lcov', 'text-summary'],
	roots: ['<rootDir>/src/', '<rootDir>/tests/'],
	testPathIgnorePatterns: ['/node_modules/', '/dist/', '/build/', '/coverage/', '/.vscode/'],
};
