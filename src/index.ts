// import * as color from './handlers/colorHandler';
import * as handler from './handlers';
import * as utils from './utils';

//#region DEV
	//!! COMMENT BEFORE BUILD 
	import * as test from './tests';
	test.test();
	setTimeout(() => {}, 1000 * 60 * 10); //* Wait 10 minutes before exiting
//#endregion

exports = {
	ConsoleInstance: handler.betterConsole.ConsoleInstance,
}
// const cons = new handler.betterConsole.ConsoleInstance('');