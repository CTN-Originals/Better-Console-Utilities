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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.test = void 0;
var consoleHandler_1 = require("../handlers/consoleHandler");
var colorHandler_1 = require("../handlers/colorHandler");
var parserTests = __importStar(require("./parserTestData"));
var cons = new consoleHandler_1.ConsoleInstance('test', true, '', { indent: (_a = parserTests.DefaultCollectionToStringOptions.indent) !== null && _a !== void 0 ? _a : 2, indentString: (_b = parserTests.DefaultCollectionToStringOptions.indentString) !== null && _b !== void 0 ? _b : ' ' }, {});
function test() {
    // cons.log('hello testing world');
    cons.log(parserTests.simpleObject);
    console.log(' ');
    cons.log(parserTests.simpleArray);
    console.log(' ');
    cons.log(parserTests.nestObject);
    // cons.log('simpleObject: ', simpleObject, 'simpleArray: ', simpleArray, 'nestObject: ', nestObject);
    // const str = collectionToString(nestObject, DefaultCollectionToStringOptions);
    // console.log(str);
    // testColors();
}
exports.test = test;
function testColors() {
    console.log((0, colorHandler_1.getColorCodePrefix)('#00FFFF') + ' i am cyan');
    console.log((0, colorHandler_1.getColorCodePrefix)('#aa00FF') + ' i am purple');
    console.log((0, colorHandler_1.getColorCodePrefix)('orange') + ' i am orange');
}
