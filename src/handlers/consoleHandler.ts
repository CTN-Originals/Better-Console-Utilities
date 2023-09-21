import * as utils from '../utils';
import * as color from './colorHandler';

interface IConsoleInstance {
	name: string;
	enabled: boolean;
	suffix: string;
	settings: {
		indent: number;
		indentString: string;
	}
	conditions: any;
}

//* intercept console.log
if (console != null && false) {
	const log = console.log.bind(console)
	console.log = (...args) => {
		const input = Array.prototype.slice.call(args)
		// log(args)

		//TODO add better (false log) detection
		//! doesnt log valid empty messages
		if (args.length == 1 && args[0] == '') return;
		log(...args)
	}
}

export class ConsoleInstance implements IConsoleInstance {
	name: string;
	enabled: boolean;
	suffix: string;
	settings: {
		indent: number;
		indentString: string;
	}
	conditions: any;
	
	/** 
	* @param {String} name Name of the console instance
	* @param {Boolean} enabled Whether the console instance is enabled or not
	* @param {String} suffix Suffix to be added to the console output
	* @param {Object} settings Settings for the console instance
	* @param {Number} settings.indent Indentation level of the console instance
	* @param {String} settings.indentString Indentation string of the console instance
	* @param {Object} conditions Conditions for the console instance
	*/
	constructor(name: string = '', enabled: boolean = true, suffix: string = '', settings: {indent: number, indentString: string} = {indent: 2, indentString: '-'}, conditions: any = {}) {
		this.name = name;
		this.enabled = enabled;
		this.suffix = suffix;
		this.settings = settings;
		this.conditions = conditions;
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
				indent: this.settings.indent,
				indentString: this.settings.indentString,
			};
			log += utils.parser.parseInput(arg, collectionStringOptipons).ToString;
			// if (typeof arg === 'object') {
			// }
			// else {
			// 	log += arg;
			// }
		}
		return log;
	}
}

