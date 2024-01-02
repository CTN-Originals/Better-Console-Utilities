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
	/** Whether the console is enabled or not [default: `true`] */
	public enabled: boolean;
	/** Theme profile for the console instance [default: `defaultThemeProfile`] */
	public theme: ThemeProfile;
	/** Indentation level of the console instance [default: `2`] */
	public indent: number;
	/** Indentation string of the console instance [default: `' '`] */
	public indentString: string;
	
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
	
	/** 
	 * @param {any[]} args Message(s) to log to the console (if multiple, each will be on a new line)
	 * @description Logs the message(s) to the console
	*/
	public log(...args: any[]) : void {
		if (!this._validate()) return;
		console.log(this.getLog(...args));
	}

	/** Logs the message(s) to the console with the default console.log function to preserve any functionality like object grouping
	 * @param {any[]} args Message(s) to log to the console (if multiple, each will be on a new line)
	*/
	public logDefault(...args: any[]) : void {
		if (!this._validate()) return;
		console.log(...args);
	}

	/** 
	 * @param {any[]} args Message(s) to log to the console (if multiple, each will be on a new line)
	 * @returns {String} Returns the formatted, parsed and colored message(s) as a string
	*/
	public getLog(...args: any[]) : string {
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

	private _validate() {
		return this.enabled;
		//TODO Conditional logging
	}
}

