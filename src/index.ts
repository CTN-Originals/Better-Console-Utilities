// import * as color from './handlers/colorHandler';
import * as handler from './handlers';
import * as utils from './utils';

//#region DEV
	// //!! COMMENT BEFORE BUILD 
	// import * as test from './tests';
	// test.test();
	// setTimeout(() => {}, 1000 * 60 * 10); //* Wait 10 minutes before exiting
//#endregion

/** 
 * @param {String} name Name of the console instance
 * @param {Boolean} enabled Whether the console instance is enabled or not
 * @param {String} suffix Suffix to be added to the console output
 * @param {Object} settings Settings for the console instance
 * @param {Number} settings.indent Indentation level of the console instance
 * @param {String} settings.indentString Indentation string of the console instance
 * @param {Object} conditions Conditions for the console instance
 * @returns {ConsoleInstance} An instance of the console
*/
export const ConsoleInstance = handler.betterConsole.ConsoleInstance;
// const cons = new handler.betterConsole.ConsoleInstance('');