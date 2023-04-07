import * as color from './handlers/colorHandler';

exports.printMsg = function() {
	console.log("This is a message from the demo package");
}
// console.log(color.tags.fg.red + 'Hello world!');

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

class ConsoleInstance implements IConsoleInstance {
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
	constructor(name: string, enabled: boolean = true, suffix: string = '', settings: {indent: number, indentString: string} = {indent: 2, indentString: ' - '}, conditions: any = {}) {
		this.name = name;
		this.enabled = enabled;
		this.suffix = suffix;
		this.settings = settings;
		this.conditions = conditions;
	}

	log(...args: any[]) {
		if (this.enabled) {
			console.log(this.name + ':', ...args, this.suffix);
		}
	}
}

const cons = new ConsoleInstance('test');

// console.log('hello world');
// console.log('hello world2');
// console.log('x = [fg=red]' + cons.settings.indent + '[bg=white] y = ' + cons.settings.indentString);
// console.group('Object cons: ');
cons.log(JSON.parse(JSON.stringify(cons)));
// console.groupEnd();