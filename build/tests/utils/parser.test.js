"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var parser = __importStar(require("../../utils/parser"));
var parserTestData_1 = require("./parserTestData");
describe('output', function () {
    var simpleObjectOutput = parser.collectionToString(parserTestData_1.simpleObject, parserTestData_1.DefaultCollectionToStringOptions);
    var simpleArrayOutput = parser.collectionToString(parserTestData_1.simpleArray, parserTestData_1.DefaultCollectionToStringOptions);
    var nestObjectOutput = parser.collectionToString(parserTestData_1.nestObject, parserTestData_1.DefaultCollectionToStringOptions);
    it('output is string', function () {
        expect(typeof simpleObjectOutput).toBe('string');
        expect(typeof simpleArrayOutput).toBe('string');
        expect(typeof nestObjectOutput).toBe('string');
    });
    // describe('simple object', () => {
    // 	describe('keys', () => {
    // 		it('contains name', () => {
    // 			expect(simpleObjectOutput.includes('name:')).toBe(true);
    // 		});
    // 		it('contains enabled', () => {
    // 			expect(simpleObjectOutput.includes('enabled:')).toBe(true);
    // 		});
    // 		it('contains suffix', () => {
    // 			expect(simpleObjectOutput.includes('suffix:')).toBe(true);
    // 		});
    // 	});
    // 	describe('values', () => {
    // 		it('contains greetings', () => {
    // 			expect(simpleObjectOutput.includes('greetings')).toBe(true);
    // 		});
    // 		it('contains true', () => {
    // 			expect(simpleObjectOutput.includes('true')).toBe(true);
    // 		});
    // 		it('contains _company', () => {
    // 			expect(simpleObjectOutput.includes('_company')).toBe(true);
    // 		});
    // 	});
    // });
    // describe('simple array', () => {
    // 	it('does not contain keys', () => {
    // 		expect(simpleArrayOutput.includes(':')).toBe(false);
    // 	});
    // 	describe('values', () => {
    // 		it('contains first', () => {
    // 			expect(simpleArrayOutput.includes('first')).toBe(true);
    // 		});
    // 		it('contains second', () => {
    // 			expect(simpleArrayOutput.includes('second')).toBe(true);
    // 		});
    // 		it('contains third', () => {
    // 			expect(simpleArrayOutput.includes('third')).toBe(true);
    // 		});
    // 	});
    // });
    describe('nested object', function () {
        it('empty object does not go to next line', function () {
            expect(nestObjectOutput.match(/\{\n[ ]*\}/g)).toBeNull();
        });
        it('empty array does not go to next line', function () {
            expect(nestObjectOutput.match(/\[\n[ ]*\]/g)).toBeNull();
        });
        describe('keys', function () {
            describe('collection keys', function () {
                describe('object contains Brackets', function () {
                    it('open', function () {
                        expect(nestObjectOutput.includes('{')).toBe(true);
                    });
                    it('close', function () {
                        expect(nestObjectOutput.includes('}')).toBe(true);
                    });
                });
                describe('array contains Brackets', function () {
                    it('open', function () {
                        expect(nestObjectOutput.includes('[')).toBe(true);
                    });
                    it('close', function () {
                        expect(nestObjectOutput.includes(']')).toBe(true);
                    });
                });
            });
        });
        describe('values', function () {
            describe('collection values', function () {
                describe('array', function () {
                    it('array does not contain keys', function () {
                        expect(nestObjectOutput.split(/[0-9]+\:/g).length).toBeLessThan(2);
                    });
                });
            });
        });
    });
    console.log(nestObjectOutput);
});
