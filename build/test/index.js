"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.test = void 0;
var consoleHandler_1 = require("../handlers/consoleHandler");
var obj = {
    name: 'First object test',
    enabled: 'true',
    suffix: 'suffix',
    data: {
        name: 'John Doe',
        age: '20',
        work: 'developer',
        hobbies: ['music', 'games', 'movies'],
    },
};
function test() {
    var cons = new consoleHandler_1.ConsoleInstance('test');
    cons.log('hello testing world');
    cons.log(obj);
}
exports.test = test;
