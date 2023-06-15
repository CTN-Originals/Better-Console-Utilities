
export interface ICollectionToStringOptions {
	indent?:		number;  //? indentation level
	indentString?:	string;  //? indentation string
	currentIndent?:	number;  //? current indentation level
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
	public Type: string; //? The type of the object
	public IsCollection: boolean; //? Is this a collection type (object/array)

	public Content: MessageContent[]; //? An array of content
	public Parent: MessageObject | null; //! Do we really need to store the parent?
	//TODO Figure out if this significently impects preformance
	public Holder: MessageContent | null; //? The item holder (only applies to items within collections)
	
	//TODO Impliment functionality (already gold correct values)
	public Depth: number; //? The depth of the line (nest levels)
	//TODO Impliment functionality (already gold correct values)
	public Indent: number; //? The number of indent characters to apply * depth
	//TODO Impliment functionality (already gold correct values)
	public IndentString: string; //? the string to use for each indent

	public Color: string; //TODO
	public BackgroundColor: string; //TODO
	public Style: string; //TODO

	/**
	 * @param {MessageObject} obj
	*/
	constructor(obj: Partial<MessageObject> = {}) {
		this.Type = obj.Type ?? 'string';
		this.IsCollection = false;
		
		this.Content = [];
		this.Parent = obj.Parent ?? null;
		this.Holder = obj.Holder ?? null;

		this.Depth = obj.Depth ?? 0;
		this.Indent = obj.Indent ?? 2;
		this.IndentString = obj.IndentString ?? ' ';

		this.Color = obj.Color ?? '';
		this.BackgroundColor = obj.BackgroundColor ?? '';
		this.Style = obj.Style ?? '';
	}

	public get ToString(): string {
		let out: string = '';

		for (let i = 0; i < this.Content.length; i++) {
			const contentObj = this.Content[i];

			if (contentObj.IsCollection) {
				const msgObj: MessageObject = contentObj.Value;
				out += msgObj.ToString;
			}
			else {
				if (this.Holder?.Type === 'array') {
					out += `\n${contentObj.Value}`;
				}
				else {
					out += `\n${contentObj.Key}: ${contentObj.Value}`;
				}
			}
		}

		return out;
	}
}

class MessageContent {
	public Type: string;
	public IsCollection: boolean;
	public Key: string;
	public Value: any;

	constructor(obj: Partial<MessageContent> = {}) {
		this.Type = obj.Type ?? 'string';
		this.IsCollection = ['object', 'array'].includes(this.Type);
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

	//? Type assertion to assert that mergedOptions is no longer partial
	//? and all its properties are defined
	const safeOptions: Required<ICollectionToStringOptions> = mergedOptions as Required<ICollectionToStringOptions>;

	const holder: MessageContent = new MessageContent({
		Type: typeOfValue(input),
		Key: 'BASE',
	});
	const msgObject: MessageObject = collectionToMessageObject(input, safeOptions, null, holder);
	holder.IsCollection = ['object', 'array'].includes(msgObject.Type);
	holder.Value = msgObject;

	return msgObject.ToString;
}

function collectionToMessageObject(collection: any, options: Required<ICollectionToStringOptions>, parent: MessageObject | null = null, holder: MessageContent | null = null): MessageObject {
	const msgObject: MessageObject = new MessageObject({
		Indent: options.indent,
		IndentString: options.indentString,
		Depth: (parent) ? parent.Depth + 1 : 0,
		Parent: parent, //! do we really need to store the parent?
		Holder: holder ?? null,
	});

	for (const key in collection) {
		const value = collection[key];

		msgObject.Type = typeOfValue(value);
		msgObject.IsCollection = ['object', 'array'].includes(msgObject.Type);

		if (msgObject.IsCollection) {
			const valueContent = collectionToMessageObject(value, options, msgObject, value);
			const content = new MessageContent({Type: msgObject.Type, Key: key, Value: valueContent});
			valueContent.Holder = content;
			msgObject.Content.push(content);
		}
		else {
			msgObject.Content.push(new MessageContent({Type: msgObject.Type, Key: key, Value: value}));
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