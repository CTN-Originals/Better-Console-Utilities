// import * as handler from '../handlers';
import { ConsoleInstance } from '../handlers/consoleHandler';
import { Theme, getColorCodePrefix, getColoredString, getThemedString } from '../handlers/colorHandler';
import * as parserTests from './parserTestData';
import { defaultColorProfile } from '../handlers/colorHandler';


const cons = new ConsoleInstance('test', true, '', {indent: 2, indentString: ' '}, {})
// const cons = new ConsoleInstance('test', true, '', {indent: parserTests.DefaultCollectionToStringOptions.indent ?? 2, indentString: parserTests.DefaultCollectionToStringOptions.indentString ?? ' '}, {});
export async function test() {

	//#region Color Handler Tests
	// console.groupCollapsed('Simple Object');
	// cons.log(parserTests.simpleObject);
	// console.groupEnd();

	// console.groupCollapsed('Simple Array');
	// cons.log(parserTests.simpleArray);
	// console.groupEnd();

	// console.group('Nested Object');
	cons.log(parserTests.nestObject);
	console.log(' ')
	// console.groupEnd();
	cons.log(JSON.stringify(parserTests.nestObject));
	console.log(' ')

	cons.log('abc');
	console.log(' ')
	cons.log(123);
	console.log(' ')
	cons.log('abc', 123);
	console.log(' ')
	// cons.log(defaultColorProfile);
	// console.log(parserTests.nestObject);
	// console.log(defaultColorProfile)
	// console.log(' ')
	//#endregion

	//#region Style Tests
	// const theme = new Theme('#ffffff', null, 'bold');
	// console.log(getThemedString('hello world', theme));
	// theme.addStyle('blink', 'underscore', 'inverse');
	// console.log(getThemedString('hello world', theme));
	// theme.removeStyle('blink', 'inverse');
	// console.log(getThemedString('hello world', theme));
	// theme.removeStyle('underscore');
	// console.log(getThemedString('hello world', theme));
	// console.log(' ')
	// console.log(theme)
	// console.log(theme.style)
	//#endregion

	//#region Recursion test
	// let x: any = [0];
	// x[0] = x;
	// cons.log(x);
	// console.log(x);
	//#endregion

	//#region Other tests
	// cons.log({'x': 'hello world'})
	// console.log(defaultColorProfile.typeThemes.string.overrides)
	// cons.log('hello testing world');
	// cons.log(parserTests.simpleObject);
	// console.log(' ')
	// cons.log(parserTests.simpleArray);
	// console.log(' ')
	// cons.log(parserTests.nestObject);
	// cons.log('simpleObject: ', simpleObject, 'simpleArray: ', simpleArray, 'nestObject: ', nestObject);
	// const str = collectionToString(nestObject, DefaultCollectionToStringOptions);
	// console.log(str);
	// testColors();
	//#endregion
}

function testColors() {
	console.log(getColorCodePrefix('#00FFFF') + ' i am cyan')
	console.log(getColorCodePrefix('#aa00FF') + ' i am purple')
	console.log(getColorCodePrefix('orange') + ' i am orange')
}


// function sleep(ms: number) {
// 	return new Promise(resolve => setTimeout(resolve, ms));
// }

// async function animate() {
// 	const colors = ['\x1b[31m', '\x1b[32m', '\x1b[33m', '\x1b[34m', '\x1b[35m', '\x1b[36m'];
// 	let colorIndex = 0;
// 	let direction = 1;
// 	let position = 0;
// 	while (true) {
// 		const color = colors[colorIndex];
// 		const spaces = ' '.repeat(position) + color + '█' + '\x1b[0m';
// 		console.log(spaces);
// 		await sleep(50);
// 		position += direction;
// 		if (position === 20 || position === 0) {
// 			direction *= -1;
// 			colorIndex = (colorIndex + 1) % colors.length;
// 		}
// 	}
// }

// animate();