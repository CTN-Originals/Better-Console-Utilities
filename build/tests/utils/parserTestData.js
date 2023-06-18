"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultCollectionToStringOptions = exports.nestObject = exports.simpleArray = exports.simpleObject = void 0;
exports.simpleObject = {
    name: 'Hello World',
    active: true,
    count: 8,
    status: 'good',
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
            },
        ],
    },
    list: [
        'first',
        'second',
        'third'
    ],
    emptyObj: {},
    emptyList: [],
};
exports.DefaultCollectionToStringOptions = {
    indent: 1,
    indentString: '  ',
    currentIndent: 0,
    brackets: true,
    color: true,
    autoColor: true, //TODO
};
