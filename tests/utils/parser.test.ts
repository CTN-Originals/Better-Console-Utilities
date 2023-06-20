import { MessageObject, MessageContent } from '../../src/utils/parser';

describe('MessageObject', () => {
	it('should create a MessageObject with default values', () => {
		const messageObject = new MessageObject();
		expect(messageObject.Depth).toEqual(0);
		expect(messageObject.IndentCount).toEqual(2);
		expect(messageObject.IndentString).toEqual(' ');
		expect(messageObject.Color).toEqual('');
		expect(messageObject.BackgroundColor).toEqual('');
		expect(messageObject.Style).toEqual('');
  	});

	it('should create a MessageObject with custom values', () => {
		const messageObject = new MessageObject({
			Depth: 1,
			IndentCount: 4,
			IndentString: '\t',
			Color: 'red',
			BackgroundColor: 'white',
			Style: 'bold',
		});
		expect(messageObject.Depth).toEqual(1);
		expect(messageObject.IndentCount).toEqual(4);
		expect(messageObject.IndentString).toEqual('\t');
		expect(messageObject.Color).toEqual('red');
		expect(messageObject.BackgroundColor).toEqual('white');
		expect(messageObject.Style).toEqual('bold');
	});

	it('should convert MessageObject to string', () => {
		const messageObject = new MessageObject({
			Depth: 1,
			IndentCount: 4,
			IndentString: '\t',
			Color: 'red',
			BackgroundColor: 'white',
			Style: 'bold',
			Content: [
				new MessageContent({ Type: 'text', Value: 'Hello' }),
				new MessageContent({ Type: 'variable', Value: 'world' }),
			],
		});
	})
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
