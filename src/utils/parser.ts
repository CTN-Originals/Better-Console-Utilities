import {
	getColorCodePrefix
} from '../handlers/colorHandler';

export interface ICollectionToStringOptions {
	indent?:		number;  //? indentation level
	indentString?:	string;  //? indentation string
	//! do we really need this? this might already be handled by indent and depth
	currentIndent?:	number; //? current indentation level
	brackets?:		boolean; //? adds brackets around the output
	color?:			boolean; //? colors the output
	autoColor?:		boolean; //? colors the values automatically based on their type
}

const DefaultCollectionToStringOptions: ICollectionToStringOptions = {
	indent: 2,
	indentString: ' ',
	currentIndent: 0,
	brackets: true, //TODO
	color: true, //TODO
	autoColor: true, //TODO
}

export class MessageObject {
	public Type: string; //? The type of the object

	public Content: MessageContent[]; //? An array of content
	public Parent: MessageObject | null; //! Do we really need to store the parent?
	//TODO Figure out if this significently impects preformance
	public Holder: MessageContent | null; //? The item holder (only applies to items within collections)
	
	public Depth: number; //? The depth of the line (nest levels)
	public IndentCount: number; //? The number of indent characters to apply * depth
	public IndentString: string; //? the string to use for each indent

	public Color: string; //TODO
	public BackgroundColor: string; //TODO
	public Style: string; //TODO

	/**
	 * @param {MessageObject} obj
	*/
	constructor(obj: Partial<MessageObject> = {}) {
		this.Type = obj.Type ?? 'string';
		
		this.Content = [];
		this.Parent = obj.Parent ?? null;
		this.Holder = obj.Holder ?? null;

		this.Depth = obj.Depth ?? 0;
		this.IndentCount = obj.IndentCount ?? 2;
		this.IndentString = obj.IndentString ?? ' ';

		this.Color = obj.Color ?? '';
		this.BackgroundColor = obj.BackgroundColor ?? '';
		this.Style = obj.Style ?? '';
	}

	public get ToString(): string {
		let out: string[] = [];
		const addLine = (input: string, isLastItem: boolean = false, depth: number = this.Depth) => {
			if (depth < 0) { depth = 0; }
			let line = `${getIndent(depth)}${input}`;
			if (!isLastItem) {
				line += ', ';
			}
			out.push(`${line}`);
		}
		const getIndent = (depth: number = this.Depth): string => {
			return this.IndentString.repeat(this.IndentCount * depth);
		}
		
		for (let i = 0; i < this.Content.length; i++) {
			const contentObj = this.Content[i];
			const isLastItem = (i === this.Content.length - 1);

			if (contentObj.IsCollection) {
				const msgObj: MessageObject = contentObj.Value;
				const holder = msgObj.Holder;
				const brackets = msgObj.Holder?.Brackets;
				
				if (holder && brackets) {
					addLine(`${msgObj.ToString}`, isLastItem, 0); //? depth=0 because indent is already applied to the content
				}
				else {
					addLine(`${msgObj.ToString}`, isLastItem);
				}
			}
			else {
				if (this.Holder?.Type === 'array') {
					addLine(`${contentObj.Value}`, isLastItem);
				}
				else {
					addLine(`${contentObj.Key}: ${contentObj.Value}`, isLastItem);
				}
			}
		}

		// console.log(this.Holder)
		if (this.Holder && this.Holder.IsCollection) {
			let head: string = `${getIndent(this.Depth - 1)}`;
			if (this.Holder.Key !== 'BASE') {
				//? If the key is not a number and is a MessageObject that is not an array, add the key
				if (this.Holder.Key.match(/[0-9]+/g) !== null && this.Holder.Value.Holder?.Type !== 'array') {
					//? do nothing? 
					//TODO Reverse this to exclude this if statement
				}
				else {
					head += `${this.Holder.Key}: `;
				}
			}
			
			const brackets = this.Holder.Brackets;
			if (brackets) {
				if (this.Content.length > 0) {
					head += `${brackets[0]}`;
					out.unshift(head);
					out.push(`${getIndent(this.Depth - 1)}${brackets[1]}`);
				}
				else {
					out.unshift(`${head}${brackets[0]}${brackets[1]}`);
				}
			}
			else {
				out.unshift(head);
			}
		}
		return out.join(`\n`);
	}
}

export class MessageContent {
	public Type: string;
	public IsCollection: boolean;
	public Key: string;
	public Value: any;
	private _breackets: string[] | null;

	constructor(obj: Partial<MessageContent> = {}) {
		this.Type = obj.Type ?? 'string';
		this.Key = obj.Key ?? '';
		this.Value = obj.Value ?? '';
		
		this.IsCollection = ['object', 'array'].includes(this.Type);
		this._breackets = (this.IsCollection) ? (this.Type === 'object') ? ['{', '}'] : ['[', ']'] : null;
	}

	public get Brackets(): string[] | null { return this._breackets; }
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

	//? Type assertion to assert that mergedOptions is no longer partial
	//? and all its properties are defined
	const safeOptions: Required<ICollectionToStringOptions> = mergedOptions as Required<ICollectionToStringOptions>;

	const holder: MessageContent = new MessageContent({
		Type: typeOfValue(input),
		Key: 'BASE',
		IsCollection: ['object', 'array'].includes(input)
	});
	const msgObject: MessageObject = collectionToMessageObject(input, safeOptions, null, holder);
	holder.Value = msgObject;

	return msgObject.ToString;
}

function collectionToMessageObject(collection: any, options: Required<ICollectionToStringOptions>, parent: MessageObject | null = null, holder: MessageContent | null = null): MessageObject {
	const msgObject: MessageObject = new MessageObject({
		Type: typeOfValue(collection),
		Parent: parent,
		Holder: holder ?? null,
		Depth: (parent) ? parent.Depth + 1 : 1,
		IndentCount: options.indent,
		IndentString: options.indentString,
	});

	for (const key in collection) {
		const value = collection[key];
		const type = typeOfValue(value);

		if (['object', 'array'].includes(type)) {
			const valueContent = collectionToMessageObject(value, options, msgObject, value);
			const content = new MessageContent({Type: type, Key: key, Value: valueContent});
			valueContent.Holder = content;
			msgObject.Content.push(content);
		}
		else {
			msgObject.Content.push(new MessageContent({Type: type, Key: key, Value: value}));
		}
	}

	return msgObject;
}

//? Returns the type of the value as a string and also returns 'array' for arrays
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