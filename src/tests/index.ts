import { ConsoleInstance } from '../handlers/consoleHandler';
import * as handler from '../handlers';
import {
	ICollectionToStringOptions, collectionToString
} from '../utils/parser'
import { getColorCodePrefix } from '../handlers/colorHandler';

export const simpleObject: { [key: string]: any } = {
	name: 'greetings',
	enabled: true,
	suffix: '_company',
};

export const simpleArray: string[] = [
	'first',
	'second',
	'third'
];

export const nestObject: { [key: string]: any } = {
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
	],
	emptyObj: {},
	emptyList: [],
};

export const DefaultCollectionToStringOptions: ICollectionToStringOptions = {
	indent: 1,
	indentString: '  ',
	currentIndent: 0,
	brackets: true, //TODO
	color: true, //TODO
	autoColor: true, //TODO
}

const cons = new ConsoleInstance('test', true, '', {indent: DefaultCollectionToStringOptions.indent ?? 2, indentString: DefaultCollectionToStringOptions.indentString ?? ' '}, {});
export function test() {
	// cons.log('hello testing world');
	// cons.log(simpleObject);
	console.log(' ')
	// cons.log(simpleArray);
	console.log(' ')
	cons.log(nestObject);
	// const str = collectionToString(nestObject, DefaultCollectionToStringOptions);
	// console.log(str);
	// console.log(str.match(/\{\n[ ]*\}/g));
	// console.log(str.match(/\[\n[ ]*\]/g));
	// console.log(JSON.stringify(simpleObject))
	// console.log(testColors)
	// cons.log('Hello Worlds');
	testColors();
}

function testColors() {
	// for (const style in handler.color.styles) {
	// 	console.log(handler.color.styles[style].full);
	// }
	// console.log(`\x1b[38;2;${255};${100};${0}m I am orange!!`) //? credits to new_duck - twitch viewer
	console.log(getColorCodePrefix('#00FFFF') + ' i am cyan')
	console.log(getColorCodePrefix('#aa00FF') + ' i am purple')
	console.log(getColorCodePrefix('orange') + ' i am orange')
}
