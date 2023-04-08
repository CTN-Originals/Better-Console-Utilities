export function collectionToString(input: any) {
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