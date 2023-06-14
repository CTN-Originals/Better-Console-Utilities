import { ConsoleInstance } from '../handlers/consoleHandler';
import * as handler from '../handlers';

const obj: { [key: string]: any } = {
	name: 'First object test',
	enabled: true,
	suffix: '_stuff',
	arr: [
		'first',
		'second',
		['third.1', 'third.2'],
	]
	// data: {
	// 	name: 'John Doe',
	// 	age: '20',
	// 	work: 'developer',
	// 	hobbies: [
	// 		[
	// 			'music', 
	// 			'piano', 
	// 			'guitar', 
	// 			'drums'
	// 		], 
	// 		{
	// 			game: 'gta5',
	// 			platform: 'pc',
	// 			year: '2013',
	// 			hours: '1000',
	// 			online: 'true',
	// 			party: 'false',
	// 			friends: [
	// 				'John Doe',
	// 				'Anny mole',
	// 				'Bob the builder',
	// 				'Jill the killer',
	// 				'Jack the ripper',
	// 			]
	// 		},
	// 		'movies'
	// 	],
	// },
}

const cons = new ConsoleInstance('test');
export function test() {
	// cons.log('hello testing world');
	cons.log(obj);
	// cons.log('Hello Worlds');
	// testColors();
}

function testColors() {
	// for (const style in handler.color.styles) {
	// 	console.log(handler.color.styles[style].full);
	// }
	console.log(`\x1b[38;2;${255};${100};${0}m I am orange!!`) //? credits to new_duck - twitch viewer
}
