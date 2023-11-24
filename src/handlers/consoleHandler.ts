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
	 * @param {ThemeProfile} options.theme Theme profile for the console instance
	 * @param {Number} options.indent Indentation level of the console instance
	 * @param {String} options.indentString Indentation string of the console instance
	*/
	constructor(options: Partial<IConsoleOptions>) {
		this.enabled = true;

		this.theme = options.theme ?? defaultThemeProfile;
		this.indent = options.indent ?? 0;
		this.indentString = options.indentString ?? ' ';
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
		return log;
	}
}

