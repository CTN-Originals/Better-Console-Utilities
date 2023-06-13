
export interface ICollectionToStringOptions {
	indent?:		number;  //* indentation level
	indentString?:	string;  //* indentation string
	currentIndent?:	number;  //* current indentation level
	brackets?:		boolean; //* adds brackets around the output
	color?:			boolean; //* colors the output
	autoColor?:		boolean; //* colors the values automatically based on their type
}

const DefaultCollectionToStringOptions: ICollectionToStringOptions = {
	indent: 2,
	indentString: ' ',
	currentIndent: 0,
	brackets: true, //TODO
	color: true, //TODO
	autoColor: true, //TODO
}

// class MessageObject {
// 	/** 
// 	 * @param {MessageObject} obj
// 	*/
// 	constructor(obj = {}) {
// 		this.id = getMsgID();
// 		this.tag = obj.tag ?? 'div';
// 		this.type = obj.type ?? 'string';
// 		this.content = obj.content ?? '';

// 		this.depth = obj.depth ?? 0;
// 		this.parent = obj.parent ?? null;
		
// 		this.children = [];
// 		this.classNodes = [];
// 		this.style = {};

// 		this.html = '';
// 		this.element = '';
// 	}
// }

class MessageObject {
	public Tag: string;
	public Indent: number;
	public IndentString: string;

	public Content: MessageContent[];
	public Depth: number;
	public Parent: MessageObject | null;

	public Color: string; //TODO
	public BackgroundColor: string; //TODO
	public Style: string; //TODO

	/**
	 * @param {MessageObject} obj
	*/
	constructor(obj: Partial<MessageObject> = {}) {
		this.Tag = obj.Tag ?? 'key-value'; //TODO
		this.Indent = obj.Indent ?? 2;
		this.IndentString = obj.IndentString ?? ' ';
		
		this.Depth = obj.Depth ?? 0;
		this.Parent = obj.Parent ?? null;
		this.Content = [];

		this.Color = obj.Color ?? '';
		this.BackgroundColor = obj.BackgroundColor ?? '';
		this.Style = obj.Style ?? '';
	}

	public get ToString(): string {
		let out: string = '';
		// console.log(this.Content);

		for (const key in this.Content) {
			const value = this.Content[key];
			const valueType = typeOfValue(value);
			// console.log(valueType)
			console.log(value)
			if (value.Type == 'array') {
				//* if value type is array, the value is a MessageObject
				const msgObj: MessageObject = value.Value;
				const contentArray: MessageContent[] = msgObj.Content;
				//TODO check type of the value
				//! asumes a string, will not work with any object like type
				for (let i = 0; i < contentArray.length; i++) {
					const content: MessageContent = contentArray[i];
					out += '\n' + content.Value;
				}
			}
			else {
				out += '\n' + value.Value;
			}
			if (valueType == 'MessageContent') {
				const msgContent: MessageContent = value;
			}
		}

		return out;
	}
}

class MessageContent {
	public Type: string;
	public Key: string | null;
	public Value: any;

	constructor(obj: Partial<MessageContent> = {}) {
		this.Type = obj.Type ?? 'string';
		this.Key = obj.Key ?? '';
		this.Value = obj.Value ?? '';
	}
}


/** 
 * @param {Object} input Input object to be converted to string
 * @param {ICollectionToStringOptions} options Options for the conversion
 * @param {Number} options.indent Indentation level of the output
 * @param {String} options.indentString Indentation string of the output
 * @param {Number} options.currentIndent Current indentation level of the output
 * @param {Boolean} options.color Whether to color the output or not
 * @param {Boolean} options.autoColor Whether to color the values automatically based on their type
 * @param {Object} options.brackets Whether to add brackets around the output and values that are collections
*/
export function collectionToString(input: any, options: Partial<ICollectionToStringOptions> = {}): string {
	const mergedOptions = {...DefaultCollectionToStringOptions, ...options};

	//* Type assertion to assert that mergedOptions is no longer partial
	//* and all its properties are defined
	const safeOptions: Required<ICollectionToStringOptions> = mergedOptions as Required<ICollectionToStringOptions>;
	const msgObject: MessageObject = collectionToMessageObject(input, safeOptions);

	console.log(msgObject.ToString);

	return '';
}

function collectionToMessageObject(collection: any, options: Required<ICollectionToStringOptions>, parent: MessageObject | null = null): MessageObject {
	const msgObject: MessageObject = new MessageObject({
		Indent: options.indent,
		IndentString: options.indentString,
		Depth: (parent) ? parent.Depth + 1 : 0,
		Parent: parent,
	});

	for (const key in collection) {
		const value = collection[key];

		if (typeof value === 'object') {
			const valueContent = collectionToMessageObject(value, options, msgObject);
			msgObject.Content.push(new MessageContent({Type: typeOfValue(value), Key: key, Value: valueContent}));
		}
		else {
			msgObject.Content.push(new MessageContent({Type: typeOfValue(value), Key: key, Value: value}));
			// console.log(valueContent.Content.Value);
		}
	}

	return msgObject;
}

//* Returns the type of the value as a string and also returns 'array' for arrays
function typeOfValue(value: any): string {
	if (typeof value == 'object') {
		if (value instanceof MessageObject) {
			return 'MessageObject';
		}
		else if (value instanceof MessageContent) {
			return 'MessageContent';
		}
		else if (Array.isArray(value)) {
			return 'array';
		}
		return 'object';
		
	}
	else {
		return typeof value
	}
}




// const specialChar: string = '◘';
// const objBrackets: [string, string] = [`{${specialChar}`, `${specialChar}}`]; //* ◘ is a placeholder for the indentation to avoid the indentation being applied the user log message
// const arrBrackets: [string, string] = [`[${specialChar}`, `${specialChar}]`]; //* ◘ is a placeholder for the indentation to avoid the indentation being applied the user log message

// function formatCollectionToArray(input: any, options: Required<ICollectionToStringOptions>): string[] {
// 	const output: any = [];
// 	let brackets: [string, string] = objBrackets;
// 	for (const key in input) {
// 		const value = input[key];

// 		if (Array.isArray(value)) {
// 			brackets = arrBrackets;
// 		}
// 		else {
// 			brackets = objBrackets; 
// 		}

// 		if (typeof value === 'object') {
// 			output.push(`${(Array.isArray(input)) ? '' : key + ': '}${brackets[0]}`);
// 			output.push(`${collectionToString(value, options)}`);
// 			output.push(`${brackets[1]}`);
// 		}
// 		else {
// 			output.push(`${(Array.isArray(input)) ? '' : key + ': '}${value}`);
// 		}
// 	}
// 	return output;
// }

// function applyIndentation(input: string[], options: Required<ICollectionToStringOptions>): string {
// 	let output = '';
// 	// let currentIndent = options.currentIndent;
// 	const incIndentString = [objBrackets[0], arrBrackets[0]];
// 	const decIndentString = [objBrackets[1], arrBrackets[1]];

// 	for (const l of input) {
// 		console.log(options.currentIndent)
// 		let line: string = l;
// 		let lineOut: string = '';
// 		lineOut += getIndent(options) + line + '\n';
// 		for (const str of incIndentString) {
// 			if (line.includes(str)) {
// 				options.currentIndent++;
// 			}
// 		}
// 		for (const str of decIndentString) {
// 			if (line.includes(str)) {
// 				options.currentIndent--;
// 			}
// 		}
// 		output += options.currentIndent + '| ' + lineOut.replace(specialChar, '');
// 	}

// 	return output;
// }

// function objectToString(input: any, options: ICollectionToStringOptionsDefault): string[] {
// 	const output: any = [];
// 	let brackets: [string, string] = objBrackets;
// 	for (const key in input) {
// 		const value = input[key];
// 		if (typeof value === 'object') {
// 			if (Array.isArray(value)) { brackets = arrBrackets; }
// 			else { brackets = objBrackets; }

// 			output.push(`${key}: ${brackets[0]}`);
// 			options.currentIndent++;
// 			output.push(`${collectionToString(value, options)}`);
// 			options.currentIndent--;
// 			output.push(`${brackets[1]}`);
// 		}
// 		else {
// 			output.push(`${key}: ${value}`);
// 		}
// 	}
// 	return output;
// }

// function arrayToString(input: any, options: ICollectionToStringOptionsDefault): string[] {
// 	const output: any = [];
// 	let brackets: [string, string] = arrBrackets;
// 	for (const key in input) {
// 		const value = input[key];
// 		if (typeof value === 'object') {
// 			if (!Array.isArray(value)) { brackets = objBrackets; }
// 			else { brackets = arrBrackets; }

// 			output.push(`${brackets[0]}`);
// 			options.currentIndent++;
// 			output.push(`${collectionToString(value, options)}`);
// 			options.currentIndent--;
// 			output.push(`${brackets[1]}`);

// 		}
// 		else {
// 			output.push(`${value}`);
// 		}
// 	}
// 	return output;
// }

// function getIndent(options: Required<ICollectionToStringOptions>, currentIndent: number = -1): string {
// 	return options.indentString.repeat(options.indent * ((currentIndent >= 0) ? currentIndent : options.currentIndent));
// }

