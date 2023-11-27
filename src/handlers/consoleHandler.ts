import * as utils from '../utils';
import { 
	ThemeProfile, defaultThemeProfile 
} from './colorHandler';

// ? WIP
// //* intercept console.log
// if (console != null && false) {
// 	const log = console.log.bind(console)
// 	console.log = (...args) => {
// 		const input = Array.prototype.slice.call(args)
// 		// log(args)

// 		//TODO add better (false log) detection
// 		//! doesnt log valid empty messages
// 		if (args.length == 1 && args[0] == '') return;
// 		log(...args)
// 	}
// }

export interface IConsoleOptions {
	theme?: ThemeProfile;
	indent?: number;
	indentString?: string;
}

export class ConsoleInstance {
	enabled: boolean;
	theme: ThemeProfile;
	indent: number;
	indentString: string;
	
	/**
	 * @param {ThemeProfile} theme Theme profile for the console instance
	 * @param {Number} indent Indentation level of the console instance
	 * @param {String} indentString Indentation string of the console instance
	*/
	constructor(theme?: ThemeProfile, indent?: number, indentString?: string);
	/** @param {IConsoleOptions} options Options for the console instance */
	constructor(options: Partial<IConsoleOptions>);
	constructor(optionsOrTheme?: Partial<IConsoleOptions> | ThemeProfile, indent?: number, indentString?: string) {
    	this.enabled = true;

		this.theme = 		((optionsOrTheme instanceof ThemeProfile) ? optionsOrTheme : optionsOrTheme?.theme) ?? defaultThemeProfile;
		this.indent = 		((optionsOrTheme instanceof ThemeProfile) ? indent : optionsOrTheme?.indent) ?? 2;
		this.indentString = ((optionsOrTheme instanceof ThemeProfile) ? indentString : optionsOrTheme?.indentString) ?? ' ';
	}
	
	public log(...args: any[]) {
		if (!this.enabled) return;
		// TODO: Add conditions

		const logOut = true; //TODO get condition from args
		if (logOut) {
			console.log(this._getLog(...args));
		}
	}

	private _getLog(...args: any[]) {
		let log = '';
		for (let i = 0; i < args.length; i++) {
			const arg = args[i];
			const collectionStringOptipons: utils.parser.ICollectionToStringOptions = {
				theme: this.theme,
				indent: this.indent,
				indentString: this.indentString,
			};
			log += utils.parser.parseInput(arg, collectionStringOptipons).ToString + ((i != args.length - 1) ? '\n' : '');
		}
		// console.log(log.split(/\x1b/g).join('').split('[0m'))
		return log;
	}
}

