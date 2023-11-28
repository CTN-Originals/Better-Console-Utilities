// /// <reference path="./index.d.ts" />

export { ConsoleInstance } from './handlers/consoleHandler';
export {
	Color,
	Theme,
	TypeThemes,
	ThemeOverride,
	ThemeProfile,
	defaultThemeProfile,
} from './handlers/colorHandler';


//#region DEV
	// //!! COMMENT BEFORE BUILD 
	// import * as test from './tests';
	// test.test();
	// setTimeout(() => {}, 1000 * 60 * 10); //* Wait 10 minutes before exiting
//#endregion