import { MessageObject, MessageContent } from '../../src/utils/parser';
import { 
	IColor,
	Theme,
	getColor,
	styles,
} from '../../src/handlers/colorHandler';

// describe('placeholder', () => {
// 	it('placeholder', () => {
// 		expect(1).toBe(1);
// 	});
// });

describe('MessageObject', () => {
	it('should create a MessageObject with default values', () => {
		const messageObject = new MessageObject();
		// console.log(messageObject);
		expect(messageObject.Depth).toEqual(0);
		expect(messageObject.IndentCount).toEqual(2);
		expect(messageObject.IndentString).toEqual(' ');
		expect(messageObject.Theme.foreground).toEqual({R: 255, G: 255, B: 255});
		expect(messageObject.Theme.background).toEqual(null);
		expect(messageObject.Theme.style).toEqual([]);
  	});

	it('should create a MessageObject with custom values', () => {
		const messageObject = new MessageObject({
			Depth: 1,
			IndentCount: 4,
			IndentString: '\t',
			Theme: new Theme('red', 'white', 'bold'),
		});
		expect(messageObject.Depth).toEqual(1);
		expect(messageObject.IndentCount).toEqual(4);
		expect(messageObject.IndentString).toEqual('\t');
		expect(messageObject.Theme.foreground).toEqual({R: 255, G: 0, B: 0});
		expect(messageObject.Theme.background).toEqual({R: 255, G: 255, B: 255});
		// expect(messageObject.Theme.style).toEqual('bold');
	});

	// it('should create a MessageObject with custom Theme value', () => {
	// 	const messageObject = new MessageObject({
	// 		Depth: 1,
	// 		IndentCount: 4,
	// 		IndentString: '_|',
	// 		Theme: new Theme('red', 'white', ['bold', 'underscore'])
	// 	});
	// })
});

// import * as parser from '../../src/utils/parser';
// import {
// 	simpleObject,
// 	simpleArray,
// 	nestObject,
// 	DefaultCollectionToStringOptions
// } from '../../src/tests/parserTestData'

// describe('output', () => {
// 	const simpleObjectOutput = parser.collectionToString(simpleObject, DefaultCollectionToStringOptions);
// 	const simpleArrayOutput = parser.collectionToString(simpleArray, DefaultCollectionToStringOptions);
// 	const nestObjectOutput = parser.collectionToString(nestObject, DefaultCollectionToStringOptions);
// 	it('output is string', () => {
// 		expect(typeof simpleObjectOutput).toBe('string');
// 		expect(typeof simpleArrayOutput).toBe('string');
// 		expect(typeof nestObjectOutput).toBe('string');
// 	});

// 	// describe('simple object', () => {
// 	// 	describe('keys', () => {
// 	// 		it('contains name', () => {
// 	// 			expect(simpleObjectOutput.includes('name:')).toBe(true);
// 	// 		});
// 	// 		it('contains enabled', () => {
// 	// 			expect(simpleObjectOutput.includes('enabled:')).toBe(true);
// 	// 		});
// 	// 		it('contains suffix', () => {
// 	// 			expect(simpleObjectOutput.includes('suffix:')).toBe(true);
// 	// 		});
// 	// 	});
// 	// 	describe('values', () => {
// 	// 		it('contains greetings', () => {
// 	// 			expect(simpleObjectOutput.includes('greetings')).toBe(true);
// 	// 		});
// 	// 		it('contains true', () => {
// 	// 			expect(simpleObjectOutput.includes('true')).toBe(true);
// 	// 		});
// 	// 		it('contains _company', () => {
// 	// 			expect(simpleObjectOutput.includes('_company')).toBe(true);
// 	// 		});
// 	// 	});
// 	// });

// 	// describe('simple array', () => {
// 	// 	it('does not contain keys', () => {
// 	// 		expect(simpleArrayOutput.includes(':')).toBe(false);
// 	// 	});
// 	// 	describe('values', () => {
// 	// 		it('contains first', () => {
// 	// 			expect(simpleArrayOutput.includes('first')).toBe(true);
// 	// 		});
// 	// 		it('contains second', () => {
// 	// 			expect(simpleArrayOutput.includes('second')).toBe(true);
// 	// 		});
// 	// 		it('contains third', () => {
// 	// 			expect(simpleArrayOutput.includes('third')).toBe(true);
// 	// 		});
// 	// 	});
// 	// });

// 	describe('nested object', () => {
// 		it('empty object does not go to next line', () => {
// 			expect(nestObjectOutput.match(/\{\n[ ]*\}/g)).toBeNull();
// 		});
// 		it('empty array does not go to next line', () => {
// 			expect(nestObjectOutput.match(/\[\n[ ]*\]/g)).toBeNull();
// 		});
// 		describe('keys', () => {
// 			describe('collection keys', () => {
// 				describe('object contains Brackets', () => {
// 					it('open', () => {
// 						expect(nestObjectOutput.includes('{')).toBe(true);
// 					});
// 					it('close', () => {
// 						expect(nestObjectOutput.includes('}')).toBe(true);
// 					});
// 				});
// 				describe('array contains Brackets', () => {
// 					it('open', () => {
// 						expect(nestObjectOutput.includes('[')).toBe(true);
// 					});
// 					it('close', () => {
// 						expect(nestObjectOutput.includes(']')).toBe(true);
// 					});
// 				});
// 			});
// 		});
// 		describe('values', () => {
// 			describe('collection values', () => {
// 				describe('array', () => {
// 					it('array does not contain keys', () => {
// 						expect(nestObjectOutput.split(/[0-9]+\:/g).length).toBeLessThan(2);
// 					});
// 				});
// 			});
// 		});
// 	})

// 	console.log(nestObjectOutput);
// });
