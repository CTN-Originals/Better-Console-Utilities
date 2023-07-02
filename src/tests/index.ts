// import * as handler from '../handlers';
import { ConsoleInstance } from '../handlers/consoleHandler';
import { getColorCodePrefix } from '../handlers/colorHandler';
import * as parserTests from './parserTestData';
import { defaultColorProfile } from '../handlers/colorHandler';


const cons = new ConsoleInstance('test', true, '', {indent: 2, indentString: ' '}, {})
// const cons = new ConsoleInstance('test', true, '', {indent: parserTests.DefaultCollectionToStringOptions.indent ?? 2, indentString: parserTests.DefaultCollectionToStringOptions.indentString ?? ' '}, {});
export function test() {

	//#region Color Handler Tests
	cons.log(defaultColorProfile);
	console.log(defaultColorProfile);
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
