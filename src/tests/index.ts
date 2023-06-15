import { ConsoleInstance } from '../handlers/consoleHandler';
import * as handler from '../handlers';
import {
	ICollectionToStringOptions
} from '../utils/parser'

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
	list: [
		'first',
		'second',
		'third'
	],
	obj: {
		name: 'John Doe',
		age: '20',
		work: 'developer'
	}
};

export const DefaultCollectionToStringOptions: ICollectionToStringOptions = {
	indent: 2,
	indentString: ' ',
	currentIndent: 0,
	brackets: true, //TODO
	color: true, //TODO
	autoColor: true, //TODO
}

const cons = new ConsoleInstance('test');
export function test() {
	// cons.log('hello testing world');
	cons.log(simpleObject);
	cons.log(simpleArray);
	cons.log(nestObject);
	// cons.log('Hello Worlds');
	// testColors();
}

function testColors() {
	// for (const style in handler.color.styles) {
	// 	console.log(handler.color.styles[style].full);
	// }
	console.log(`\x1b[38;2;${255};${100};${0}m I am orange!!`) //? credits to new_duck - twitch viewer
}
