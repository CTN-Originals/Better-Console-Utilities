export * as parser from './parser';


/** 
 * @param {any} input The input to be parsed
*/
export function tryParseJSON(input: any) {
	try {
		return JSON.parse(input);
	} catch {
		return null;
	}
}

export function replaceAll(str: string, find: string, replace: string) {
	return str.replace(new RegExp(find, 'g'), replace);
}