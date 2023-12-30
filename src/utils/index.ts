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

export function replaceAll(str: string, find: string|string[], replace: string) {
	if (Array.isArray(find)) {
		find.forEach((f) => {
			str = str.replace(new RegExp(f, 'g'), replace);
		});
		return str;
	}
	else {
		return str.replace(new RegExp(find, 'g'), replace);
	}
}