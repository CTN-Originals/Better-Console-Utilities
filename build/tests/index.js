"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.test = exports.DefaultCollectionToStringOptions = exports.nestObject = exports.simpleArray = exports.simpleObject = void 0;
var consoleHandler_1 = require("../handlers/consoleHandler");
exports.simpleObject = {
    name: 'greetings',
    enabled: true,
    suffix: '_company',
};
exports.simpleArray = [
    'first',
    'second',
    'third'
];
exports.nestObject = {
    name: 'First object test',
    enabled: true,
    suffix: '_stuff',
    obj: {
        name: 'John Doe',
        age: '20',
        work: 'developer',
        hobbies: [
            {
                name: 'programming',
                active: true,
                years: 5
            },
            {
                name: 'gaming',
                years: 10,
                favorite: true,
                games: {
                    name: 'osu',
                    genre: 'rhythm',
                    years: 7,
                }
            }
        ]
    },
    list: [
        'first',
        'second',
        'third'
    ]
};
exports.DefaultCollectionToStringOptions = {
    indent: 1,
    indentString: '  ',
    currentIndent: 0,
    brackets: true,
    color: true,
    autoColor: true, //TODO
};
var cons = new consoleHandler_1.ConsoleInstance('test', true, '', { indent: (_a = exports.DefaultCollectionToStringOptions.indent) !== null && _a !== void 0 ? _a : 2, indentString: (_b = exports.DefaultCollectionToStringOptions.indentString) !== null && _b !== void 0 ? _b : ' ' }, {});
function test() {
    // cons.log('hello testing world');
    // cons.log(simpleObject);
    console.log(' ');
    // cons.log(simpleArray);
    console.log(' ');
    cons.log(exports.nestObject);
    // cons.log('Hello Worlds');
    // testColors();
}
exports.test = test;
function testColors() {
    // for (const style in handler.color.styles) {
    // 	console.log(handler.color.styles[style].full);
    // }
    console.log("\u001B[38;2;".concat(255, ";").concat(100, ";").concat(0, "m I am orange!!")); //? credits to new_duck - twitch viewer
}
