module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	testMatch: ['**/tests/**/*.test.ts'],
	collectCoverage: true,
	coverageReporters: ['lcov', 'text-summary'],
	roots: ['<rootDir>/src'],
	testPathIgnorePatterns: ['/node_modules/', '/dist/', '/build/', '/coverage/', '/.vscode/'],
};
