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
var index_1 = require("../index");
describe('output', function () {
    var simpleObjectOutput = parser.collectionToString(index_1.simpleObject, index_1.DefaultCollectionToStringOptions);
    var simpleArrayOutput = parser.collectionToString(index_1.simpleArray, index_1.DefaultCollectionToStringOptions);
    var nestObjectOutput = parser.collectionToString(index_1.nestObject, index_1.DefaultCollectionToStringOptions);
    it('output is string', function () {
        expect(typeof simpleObjectOutput).toBe('string');
        expect(typeof simpleArrayOutput).toBe('string');
        expect(typeof nestObjectOutput).toBe('string');
    });
    describe('simple object', function () {
        describe('keys', function () {
            it('contains name', function () {
                expect(simpleObjectOutput.includes('name:')).toBe(true);
            });
            it('contains enabled', function () {
                expect(simpleObjectOutput.includes('enabled:')).toBe(true);
            });
            it('contains suffix', function () {
                expect(simpleObjectOutput.includes('suffix:')).toBe(true);
            });
        });
        describe('values', function () {
            it('contains greetings', function () {
                expect(simpleObjectOutput.includes('greetings')).toBe(true);
            });
            it('contains true', function () {
                expect(simpleObjectOutput.includes('true')).toBe(true);
            });
            it('contains _company', function () {
                expect(simpleObjectOutput.includes('_company')).toBe(true);
            });
        });
    });
    describe('simple array', function () {
        it('does not contain keys', function () {
            expect(simpleArrayOutput.includes(':')).toBe(false);
        });
        describe('values', function () {
            it('contains first', function () {
                expect(simpleArrayOutput.includes('first')).toBe(true);
            });
            it('contains second', function () {
                expect(simpleArrayOutput.includes('second')).toBe(true);
            });
            it('contains third', function () {
                expect(simpleArrayOutput.includes('third')).toBe(true);
            });
        });
    });
    describe('nested object', function () {
        describe('keys', function () {
            // it('contains name', () => {
            // 	expect(nestObjectOutput.includes('name:')).toBe(true);
            // });
            // it('contains enabled', () => {
            // 	expect(nestObjectOutput.includes('enabled:')).toBe(true);
            // });
            // it('contains suffix', () => {
            // 	expect(nestObjectOutput.includes('suffix:')).toBe(true);
            // });
            describe('collection keys', function () {
                // it('contains obj', () => {
                // 	expect(nestObjectOutput.includes('obj:')).toBe(true);
                // });
                // it('contains list', () => {
                // 	expect(nestObjectOutput.includes('list:')).toBe(true);
                // });
                describe('object contains Brackets', function () {
                    it('open', function () {
                        expect(nestObjectOutput.includes(': {')).toBe(true);
                    });
                    it('close', function () {
                        expect(nestObjectOutput.includes('}')).toBe(true);
                    });
                });
                describe('array contains Brackets', function () {
                    it('open', function () {
                        expect(nestObjectOutput.includes(': [')).toBe(true);
                    });
                    it('close', function () {
                        expect(nestObjectOutput.includes(']')).toBe(true);
                    });
                });
            });
        });
        describe('values', function () {
            // it('contains First object test', () => {
            // 	expect(nestObjectOutput.includes('First object test')).toBe(true);
            // });
            // it('contains true', () => {
            // 	expect(nestObjectOutput.includes('true')).toBe(true);
            // });
            // it('contains _stuff', () => {
            // 	expect(nestObjectOutput.includes('_stuff')).toBe(true);
            // });
            describe('collection values', function () {
                // describe('object', () => {
                // 	it('contains John Doe(,)', () => {
                // 		expect(nestObjectOutput.includes('John Doe')).toBe(true);
                // 		// expect(nestObjectOutput.includes('John Doe,')).toBe(true);
                // 	});
                // 	it('contains 20(,)', () => {
                // 		expect(nestObjectOutput.includes('20')).toBe(true);
                // 		// expect(nestObjectOutput.includes('20,')).toBe(true);
                // 	});
                // 	it('contains developer(!,)', () => {
                // 		expect(nestObjectOutput.includes('developer')).toBe(true);
                // 		// expect(nestObjectOutput.includes('developer,')).toBe(false);
                // 	});
                // })
                describe('array', function () {
                    it('array does not contain keys', function () {
                        expect(nestObjectOutput.split(/[0-9]+: [^\{]/g).length).toBeLessThan(2);
                    });
                    // it('contains first(,)', () => {
                    // 	expect(nestObjectOutput.includes('first')).toBe(true);
                    // 	// expect(nestObjectOutput.includes('first,')).toBe(true);
                    // });
                    // it('contains second(,)', () => {
                    // 	expect(nestObjectOutput.includes('second')).toBe(true);
                    // 	// expect(nestObjectOutput.includes('second,')).toBe(true);
                    // });
                    // it('contains third(!,)', () => {
                    // 	expect(nestObjectOutput.includes('third')).toBe(true);
                    // 	// expect(nestObjectOutput.includes('third,')).toBe(false);
                    // });
                });
            });
        });
    });
    console.log(nestObjectOutput);
});
