// import * as color from './handlers/colorHandler';
import * as handler from './handlers';
import * as utils from './utils';

//#region DEV
	//!! COMMENT BEFORE BUILD 
	import * as test from './tests';
	test.test();
	setTimeout(() => {}, 1000 * 60 * 10); // 10 minutes
//#endregion


exports = {
	ConsoleInstance: handler.betterConsole.ConsoleInstance,
}

//#region Core

//#endregion

// console.log(color.tags.fg.red + 'Hello world!');

const cons = new handler.betterConsole.ConsoleInstance('');

//* Wait 10 minutes before exiting


// console.log('hello world');
// console.log('hello world2');
// console.log('x = [fg=red]' + cons.settings.indent + '[bg=white] y = ' + cons.settings.indentString);
// console.group('Object cons: ');
// cons.log(JSON.parse(JSON.stringify(cons)));
// console.groupEnd();