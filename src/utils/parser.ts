import {
	Theme,
	getColor,
	getColorCodePrefix,
	getThemedString,
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

	public Theme: Theme; //? The theme to use for coloring

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

		this.Theme = obj.Theme ?? new Theme();
		//TODO Setting for punctuation (e.g. quotes around strings)
	}

	public get ToString(): string {
		let out: string[] = [];
		const addLine = (input: string, isLastItem: boolean = false, depth: number = this.Depth) => {
			if (depth < 0) { depth = 0; }
			let line = `${getIndent(depth)}${input}`;
			if (!isLastItem) {
				line += ',';
			}
			out.push(`${line}`);
		}
		const getIndent = (depth: number = this.Depth): string => {
			// const bg = this.Theme.background.seturate(0.5 + (0.5 * (depth / 10)));
			// return getThemedString(this.IndentString.repeat(this.IndentCount * depth), new Theme(null, bg, null))
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
				else if (contentObj.Type === 'null') {
					addLine(`${contentObj.Key}: ${contentObj.Value}null`, isLastItem);
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

	// console.log(msgObject)

	return msgObject.ToString;
}


const recursionStorage: any[] = []; //? Stores all the objects that have been accessed to check for recursion

export function collectionToMessageObject(collection: any, options: Required<ICollectionToStringOptions>, parent: MessageObject | null = null, holder: MessageContent | null = null): MessageObject {
	const msgObject: MessageObject = new MessageObject({
		Type: typeOfValue(collection),
		Parent: parent,
		Holder: holder ?? null,
		Depth: (parent) ? parent.Depth + 1 : 1,
		IndentCount: options.indent,
		IndentString: options.indentString,
	});
	
	recursionStorage.push(collection); 
	//? Check for recursion
	//? If the object is the same as a previous object in the stack
	//* Credits to: Shaw(4984) - discord - Game Dev League
	for (let i = recursionStorage.length - 2; i >= 0; i--) {
		const element = recursionStorage[i];
		if (Object.is(collection, element)) {
			console.error('Recursion detected');
			msgObject.Content.push(new MessageContent({Type: 'recursion', Key: 'recursion', Value: '<recursion detected>'}));
			return msgObject;
		}
	}

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

	recursionStorage.pop();

	return msgObject;
}

//? Returns the type of the value as a string and also returns 'array' for arrays
function typeOfValue(value: any): string {
	if (typeof value == 'object') {
		if (Array.isArray(value)) {
			return 'array';
		}
		else if (value === null) {
			return 'null';
		}
		else {
			return 'object';
		}
		
	}
	else {
		return typeof value
	}
}