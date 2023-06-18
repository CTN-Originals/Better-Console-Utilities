import * as handler from '../handlers';
import { ConsoleInstance } from '../handlers/consoleHandler';
import { getColorCodePrefix } from '../handlers/colorHandler';
import * as parserTests from './parserTestData';

const cons = new ConsoleInstance('test', true, '', {indent: parserTests.DefaultCollectionToStringOptions.indent ?? 2, indentString: parserTests.DefaultCollectionToStringOptions.indentString ?? ' '}, {});
export function test() {
	// cons.log('hello testing world');
	cons.log(parserTests.simpleObject);
	console.log(' ')
	cons.log(parserTests.simpleArray);
	console.log(' ')
	cons.log(parserTests.nestObject);
	// cons.log('simpleObject: ', simpleObject, 'simpleArray: ', simpleArray, 'nestObject: ', nestObject);
	// const str = collectionToString(nestObject, DefaultCollectionToStringOptions);
	// console.log(str);
	// testColors();
}

function testColors() {
	console.log(getColorCodePrefix('#00FFFF') + ' i am cyan')
	console.log(getColorCodePrefix('#aa00FF') + ' i am purple')
	console.log(getColorCodePrefix('orange') + ' i am orange')
}
