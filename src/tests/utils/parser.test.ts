import * as parser from '../../utils/parser';
import {
	simpleObject,
	simpleArray,
	nestObject,
	DefaultCollectionToStringOptions
} from '../index'


describe('output', () => {
	const simpleObjectOutput = parser.collectionToString(simpleObject, DefaultCollectionToStringOptions);
	const simpleArrayOutput = parser.collectionToString(simpleArray, DefaultCollectionToStringOptions);
	const nestObjectOutput = parser.collectionToString(nestObject, DefaultCollectionToStringOptions);
	it('output is string', () => {
		expect(typeof simpleObjectOutput).toBe('string');
		expect(typeof simpleArrayOutput).toBe('string');
		expect(typeof nestObjectOutput).toBe('string');
	});

	describe('simple object', () => {
		describe('keys', () => {
			it('contains name', () => {
				expect(simpleObjectOutput.includes('name:')).toBe(true);
			});
			it('contains enabled', () => {
				expect(simpleObjectOutput.includes('enabled:')).toBe(true);
			});
			it('contains suffix', () => {
				expect(simpleObjectOutput.includes('suffix:')).toBe(true);
			});
		});
		describe('values', () => {
			it('contains greetings', () => {
				expect(simpleObjectOutput.includes('greetings')).toBe(true);
			});
			it('contains true', () => {
				expect(simpleObjectOutput.includes('true')).toBe(true);
			});
			it('contains _company', () => {
				expect(simpleObjectOutput.includes('_company')).toBe(true);
			});
		});
	});

	describe('simple array', () => {
		it('does not contain keys', () => {
			expect(simpleArrayOutput.includes(':')).toBe(false);
		});
		describe('values', () => {
			it('contains first', () => {
				expect(simpleArrayOutput.includes('first')).toBe(true);
			});
			it('contains second', () => {
				expect(simpleArrayOutput.includes('second')).toBe(true);
			});
			it('contains third', () => {
				expect(simpleArrayOutput.includes('third')).toBe(true);
			});
		});
	});

	describe('nested object', () => {
		describe('keys', () => {
			it('contains name', () => {
				expect(nestObjectOutput.includes('name:')).toBe(true);
			});
			it('contains enabled', () => {
				expect(nestObjectOutput.includes('enabled:')).toBe(true);
			});
			it('contains suffix', () => {
				expect(nestObjectOutput.includes('suffix:')).toBe(true);
			});
			describe('collection keys', () => {
				it('contains list: [', () => {
					expect(nestObjectOutput.includes('list:')).toBe(true);
					expect(nestObjectOutput.includes('list: [')).toBe(true);
				});
				it('contains obj: {', () => {
					expect(nestObjectOutput.includes('obj:')).toBe(true);
					expect(nestObjectOutput.includes('obj: {')).toBe(true);
				});
			});
		});
		describe('values', () => {
			it('contains First object test', () => {
				expect(nestObjectOutput.includes('First object test')).toBe(true);
			});
			it('contains true', () => {
				expect(nestObjectOutput.includes('true')).toBe(true);
			});
			it('contains _stuff', () => {
				expect(nestObjectOutput.includes('_stuff')).toBe(true);
			});
			describe('collection values', () => {
				describe('array', () => {
					it('array does not contain keys', () => {
						expect(nestObjectOutput.split(/[0-9]+: /g).length).toBeLessThan(2);
					});
					it('contains first(,)', () => {
						expect(nestObjectOutput.includes('first')).toBe(true);
						expect(nestObjectOutput.includes('first,')).toBe(true);
					});
					it('contains second(,)', () => {
						expect(nestObjectOutput.includes('second')).toBe(true);
						expect(nestObjectOutput.includes('second,')).toBe(true);
					});
					it('contains third(!,)', () => {
						expect(nestObjectOutput.includes('third')).toBe(true);
						expect(nestObjectOutput.includes('third,')).toBe(false);
					});
				})
				describe('object', () => {
					it('contains John Doe', () => {
						expect(nestObjectOutput.includes('John Doe')).toBe(true);
					});
					it('contains 20', () => {
						expect(nestObjectOutput.includes('20')).toBe(true);
					});
					it('contains developer', () => {
						expect(nestObjectOutput.includes('developer')).toBe(true);
					});
				})
			});
		});
	})

	console.log(nestObjectOutput);
});
