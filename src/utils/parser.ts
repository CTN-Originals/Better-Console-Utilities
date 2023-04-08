
export interface ICollectionToStringOptions {
	indent?:		number;  //* indentation level
	indentString?:	string;  //* indentation string
	brackets?:		boolean; //* adds brackets around the output
	color?:			boolean; //* colors the output
	autoColor?:		boolean; //* colors the values automatically based on their type
}

/** 
 * @param {Object} input Input object to be converted to string
 * @param {ICollectionToStringOptions} options Options for the conversion
 * @param {Number} options.indent Indentation level of the output
 * @param {String} options.indentString Indentation string of the output
 * @param {Boolean} options.color Whether to color the output or not
 * @param {Boolean} options.autoColor Whether to color the values automatically based on their type
 * @param {Object} options.brackets Whether to add brackets around the output and values that are collections
*/
export function collectionToString(input: any, options: ICollectionToStringOptions = {}): string {
	const output: any = [];
	for (const key in input) {
		if (input.hasOwnProperty(key)) {
			const value = input[key];
			if (typeof value === 'object') {
				output.push(`${key}:`);
				output.push(collectionToString(value));
			}
			else {
				output.push(`${key}: ${value}`);
			}
		}
	}
	return output.join('\n');
}
