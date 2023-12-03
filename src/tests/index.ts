// import * as handler from '../handlers';
import { ConsoleInstance } from '../handlers/consoleHandler';
import { Color, Theme, ThemeProfile, TypeThemes } from '../handlers/colorHandler';
import * as parserTests from './parserTestData';
import { defaultThemeProfile } from '../handlers/colorHandler';

const color = new Color({R: 255, G: 155, B: 55})
const color2 = new Color('#2a40ac')
const color3 = new Color()

const primary = new ThemeProfile({
	default: new Theme('#c9c9c9'),
	typeThemes: new TypeThemes({
		
		// string: {default: new Theme('#cebaa8')},
		object: {
			default: new Theme('#ff0000'),
			// key: new Theme(color),
			// punctuation: new Theme('green'),
			// brackets: new Theme(color2.seturate(3)),
			// value: new Theme('#00ffaa'),
		},
		array: {
			default: new Theme('green'),
			// punctuation: new Theme('yellow'),
			// brackets: new Theme(color2),
			// value: new Theme('#ff66ff'),
		}
	}),
});

const secondary = new ThemeProfile({
	default: new Theme('#c9c9c9'),
	typeThemes: new TypeThemes({
		default: new Theme('#ff0000'),
		string: {default: new Theme('#cebaa8')},
		object: {
			key: new Theme(color),
			punctuation: new Theme('green'),
		},
		array: {
			punctuation: new Theme('red'),
			brackets: new Theme(color3),
		}
	}),
});


const cons = new ConsoleInstance({theme: primary, indent: 2, indentString: ' '})
const cons2 = new ConsoleInstance({theme: secondary, indent: 2, indentString: ' '})

console.log('Test Hello World')
cons.log('Test "Hello World" red ')

const simpleObject = {
	name: 'Hello World',
	active: true,
	count: 8,
	status: 'good',
	list: [
		'first',
		'second',
		'ctn',
		12345,
	],
};
const simpleArray = [
	'first',
	'second',
	'third',
	321,
	{
		name: 'Hello World',
		active: true
	},
];


export async function test() {
	cons.log(simpleObject)
	cons.log(simpleArray)
	cons.log(' ')
	cons2.log(simpleObject)
	cons2.log(simpleArray)
	// console.log(cons.theme)
	// console.log(cons2.theme)
	
	//#region Color Handler Tests
	// console.groupCollapsed('Simple Object');
	// cons.log(parserTests.simpleObject);
	// cons.log(parserTests.simpleArray);
	// cons.log('[fg=red]The red fox[/>] and "some true glow over [fg=green bg=#000040]the green bear[/>] on a warm orange day" at 13:45 with [fg=blue]the blue wolf[/>]');
	// cons2.log(parserTests.simpleObject);
	// cons2.log('[fg=red]The red fox[/>] and "some true glow over [fg=green bg=#000040]the green bear[/>] on a warm orange day" at 13:45 with [fg=blue]the blue wolf[/>]');
	// console.groupEnd();

	// console.groupCollapsed('Simple Array');
	// cons.log(parserTests.simpleArray);
	// console.groupEnd();

	// console.group('Nested Object');
	// cons.log(parserTests.nestObject);
	// console.log(' ')
	// console.groupEnd();

	// console.log(JSON.stringify(parserTests.nestObject));
	// cons.log(parserTests.nestObject);
	// console.log(' ')
	// cons.log('"string red" red (testing :D)', '"string (red green someStr) awd" red ... nothing "blue" normal ctn');
	// cons.log('"string"`str` ::. ..: redred');
	// cons.log('green normal blue green');
	// cons.log(testColors);
	// cons.log('const array = [1, 2, 3];', 'if (x == 1) { console.log("hello world"); }');

	// cons.log('[fg=red bg=blue st=bold,underscore]The red blue fox[/>] and [fg=blue bg=green]The blue green frog[/>]');
	// cons.log('[fg=red]The red fox[/>] and "some purple glow over [fg=green]the green bear[/>] on a warm orange day" at 13:45 with [fg=blue]the blue wolf[/>]');
	// cons.log('[fg=#ffAA00]almost red[/>] ... [fg=#00FFFF]green and blue[/>] + - / * = % . ; , [fg=#FF00FF]Opposite side hex colors[/>]');
	// cons.log('I love how a "string color" is almost universal. [fg=#00ff22]color syntax prioritizes over overrides "like a string" for example[/>]');
	// cons.log('Color syntax has a bug where "if you have an override like a string and [fg=red]some color flag like this[/>] it will not continue the string after the color flag unless there is another override inside it"');
	// cons.log('Warning ... We are in Danger! There was [ERROR] Error an eRrOr?! We need to warn the User! Alert the captain!');

	// cons.log('. red + bold', ': green - blue');
	// cons.log('abc');
	// console.log(' ')
	// cons.log(123);
	// console.log(' ')
	// cons.log('abc', 123);
	// console.log(' ')
	// cons.log(defaultColorProfile);
	// cons.log(parserTests.nestObject);
	// console.log(defaultColorProfile)
	// console.log(' ')
	//#endregion

	//#region Style Tests
	// const theme = new Theme('#ffffff', null, 'bold');
	// console.log(getThemedString('hello world', theme));
	// theme.addStyle('blink', 'underscore', 'inverse');
	// console.log(getThemedString('hello world', theme));
	// theme.removeStyle('blink', 'inverse');
	// console.log(getThemedString('hello world', theme));
	// theme.removeStyle('underscore');
	// console.log(getThemedString('hello world', theme));
	// console.log(' ')
	// console.log(theme)
	// console.log(theme.style)
	//#endregion

	//#region Recursion test
	// let x: any = [0];
	// x[0] = x;
	// cons.log(x);
	// console.log(x);
	//#endregion

	//#region Other tests
	// cons.log({'x': 'hello world'})
	// console.log(defaultColorProfile.typeThemes.string.overrides)
	// cons.log('hello testing world');
	// cons.log(parserTests.simpleObject);
	// console.log(' ')
	// cons.log(parserTests.simpleArray);
	// console.log(' ')
	// cons.log(parserTests.nestObject);
	// cons.log('simpleObject: ', simpleObject, 'simpleArray: ', simpleArray, 'nestObject: ', nestObject);
	// const str = collectionToString(nestObject, DefaultCollectionToStringOptions);
	// console.log(str);
	// testColors();
	//#endregion
}

function testColors() {
	// console.log([
	// 	'[38;2;255;0;0m[1mred bold[0m [38;2;255;0;0m[4mred underscore[0m [38;2;255;0;0m[2mred dim[0m [38;2;255;0;0m[5mred blink[0m [38;2;255;0;0m[7mred inverse[0m [38;2;255;0;0m[8mred hidden[0m [38;2;255;0;0m[1m[4mred bold underscore[0m',
	// 	'[38;2;0;255;0m[1mgreen bold[0m [38;2;0;255;0m[4mgreen underscore[0m [38;2;0;255;0m[2mgreen dim[0m [38;2;0;255;0m[5mgreen blink[0m [38;2;0;255;0m[7mgreen inverse[0m [38;2;0;255;0m[8mgreen hidden[0m [38;2;0;255;0m[1m[4mgreen bold underscore[0m',
	// 	'[38;2;0;0;255m[1mblue bold[0m [38;2;0;0;255m[4mblue underscore[0m [38;2;0;0;255m[2mblue dim[0m [38;2;0;0;255m[5mblue blink[0m [38;2;0;0;255m[7mblue inverse[0m [38;2;0;0;255m[8mblue hidden[0m [38;2;0;0;255m[1m[4mblue bold underscore[0m',
	// 	'[38;2;255;255;255m[1mwhite bold[0m [38;2;255;255;255m[4mwhite underscore[0m [38;2;255;255;255m[2mwhite dim[0m [38;2;255;255;255m[5mwhite blink[0m [38;2;255;255;255m[7mwhite inverse[0m [38;2;255;255;255m[8mwhite hidden[0m [38;2;255;255;255m[1m[4mwhite bold underscore[0m',
	// 	'[38;2;255;165;0m[1morange bold[0m [38;2;255;165;0m[4morange underscore[0m [38;2;255;165;0m[2morange dim[0m [38;2;255;165;0m[5morange blink[0m [38;2;255;165;0m[7morange inverse[0m [38;2;255;165;0m[8morange hidden[0m [38;2;255;165;0m[1m[4morange bold underscore[0m',
	// 	'[38;2;128;0;128m[1mpurple bold[0m [38;2;128;0;128m[4mpurple underscore[0m [38;2;128;0;128m[2mpurple dim[0m [38;2;128;0;128m[5mpurple blink[0m [38;2;128;0;128m[7mpurple inverse[0m [38;2;128;0;128m[8mpurple hidden[0m [38;2;128;0;128m[1m[4mpurple bold underscore[0m',
	// 	'[38;2;255;192;203m[1mpink bold[0m [38;2;255;192;203m[4mpink underscore[0m [38;2;255;192;203m[2mpink dim[0m [38;2;255;192;203m[5mpink blink[0m [38;2;255;192;203m[7mpink inverse[0m [38;2;255;192;203m[8mpink hidden[0m [38;2;255;192;203m[1m[4mpink bold underscore[0m',
	// 	'[38;2;255;255;0m[1myellow bold[0m [38;2;255;255;0m[4myellow underscore[0m [38;2;255;255;0m[2myellow dim[0m [38;2;255;255;0m[5myellow blink[0m [38;2;255;255;0m[7myellow inverse[0m [38;2;255;255;0m[8myellow hidden[0m [38;2;255;255;0m[1m[4myellow bold underscore[0m',
	// ].join('\n'))
	const table: {[key: string]: {[key: string]: string}} = {
		red: { 
			bold: "[38;2;255;0;0m[1mred bold[0m", 
			underscore: "[38;2;255;0;0m[4mred underscore[0m", 
			dim: "[38;2;255;0;0m[2mred dim[0m", 
			blink: "[38;2;255;0;0m[5mred blink[0m", 
			inverse: "[38;2;255;0;0m[7mred inverse[0m",
		},
		green: { 
			bold: "[38;2;0;255;0m[1mgreen bold[0m", 
			underscore: "[38;2;0;255;0m[4mgreen underscore[0m", 
			dim: "[38;2;0;255;0m[2mgreen dim[0m", 
			blink: "[38;2;0;255;0m[5mgreen blink[0m", 
			inverse: "[38;2;0;255;0m[7mgreen inverse[0m",
		},
		blue: { 
			bold: "[38;2;0;0;255m[1mblue bold[0m", 
			underscore: "[38;2;0;0;255m[4mblue underscore[0m", 
			dim: "[38;2;0;0;255m[2mblue dim[0m", 
			blink: "[38;2;0;0;255m[5mblue blink[0m", 
			inverse: "[38;2;0;0;255m[7mblue inverse[0m",
		},
		white: { 
			bold: "[38;2;255;255;255m[1mwhite bold[0m", 
			underscore: "[38;2;255;255;255m[4mwhite underscore[0m", 
			dim: "[38;2;255;255;255m[2mwhite dim[0m", 
			blink: "[38;2;255;255;255m[5mwhite blink[0m", 
			inverse: "[38;2;255;255;255m[7mwhite inverse[0m",
		},
		cyan: {
			bold: "[38;2;0;255;255m[1mcyan bold[0m", 
			underscore: "[38;2;0;255;255m[4mcyan underscore[0m", 
			dim: "[38;2;0;255;255m[2mcyan dim[0m", 
			blink: "[38;2;0;255;255m[5mcyan blink[0m", 
			inverse: "[38;2;0;255;255m[7mcyan inverse[0m",
		},
		orange: { 
			bold: "[38;2;255;165;0m[1morange bold[0m", 
			underscore: "[38;2;255;165;0m[4morange underscore[0m", 
			dim: "[38;2;255;165;0m[2morange dim[0m", 
			blink: "[38;2;255;165;0m[5morange blink[0m", 
			inverse: "[38;2;255;165;0m[7morange inverse[0m",
		},
		yellow: { 
			bold: "[38;2;255;255;0m[1myellow bold[0m", 
			underscore: "[38;2;255;255;0m[4myellow underscore[0m", 
			dim: "[38;2;255;255;0m[2myellow dim[0m", 
			blink: "[38;2;255;255;0m[5myellow blink[0m", 
			inverse: "[38;2;255;255;0m[7myellow inverse[0m",
		},
		pink: { 
			bold: "[38;2;255;192;203m[1mpink bold[0m", 
			underscore: "[38;2;255;192;203m[4mpink underscore[0m", 
			dim: "[38;2;255;192;203m[2mpink dim[0m", 
			blink: "[38;2;255;192;203m[5mpink blink[0m", 
			inverse: "[38;2;255;192;203m[7mpink inverse[0m",
		},
		purple: { 
			bold: "[38;2;128;0;128m[1mpurple bold[0m", 
			underscore: "[38;2;128;0;128m[4mpurple underscore[0m", 
			dim: "[38;2;128;0;128m[2mpurple dim[0m", 
			blink: "[38;2;128;0;128m[5mpurple blink[0m", 
			inverse: "[38;2;128;0;128m[7mpurple inverse[0m",
		},
	};

	const space = 20;
	for (let color in table) {
		const colorTable = table[color];
		let line = ``;
		for (let style in colorTable) {
			let lineSpaceCount = (space - (color.length + style.length)) / 2
			lineSpaceCount = (lineSpaceCount % 2 === 0) ? lineSpaceCount : lineSpaceCount + 1;
			let lineSpace = ' '.repeat(lineSpaceCount);
			line += `${lineSpace}${colorTable[style]}${lineSpace}`;
		}
		console.log(line);
	}
}

// function sleep(ms: number) {
// 	return new Promise(resolve => setTimeout(resolve, ms));
// }

// async function animate() {
// 	const colors = ['\x1b[31m', '\x1b[32m', '\x1b[33m', '\x1b[34m', '\x1b[35m', '\x1b[36m'];
// 	let colorIndex = 0;
// 	let direction = 1;
// 	let position = 0;
// 	while (true) {
// 		const color = colors[colorIndex];
// 		const spaces = ' '.repeat(position) + color + '█' + '\x1b[0m';
// 		console.log(spaces);
// 		await sleep(50);
// 		position += direction;
// 		if (position === 20 || position === 0) {
// 			direction *= -1;
// 			colorIndex = (colorIndex + 1) % colors.length;
// 		}
// 	}
// }

// animate();


// let out = input;
// // const flagRegex = new RegExp(/\x1b\[((3|4)8|\d{1})(;2(;\d{1,3}){3})?m/g);
// const flagMatchList: any[] = []
		
// //? remove flag from input
// // const matchList = input.match(colorFlagRegex);
// // if (matchList !== null) {
// // 	console.log(matchList)
// // 	for (let match of matchList) {
// // 		if (!match) { continue; }
// // 		match = match.replace('[', '\\[');
// // 		const reg = new RegExp(match);
// // 		const exec = reg.exec(input);
// // 		if (!exec) { continue; }
// // 		flagMatchList.push(exec);
// // 		// input = input.replace(exec[0], '');
// // 	}
// // 	input = input.replace(colorFlagRegex, '');
// // 	// input = input.replace(styleFlagRegex, '');
// // }
// // console.log(flagMatchList)


// console.log('\n---- Before ----\n', out, '\n')

	// //? add the flag back to the input
	// let positionIndex = 0;
	// let logTable: {data: any, out: string, flag: string[]}[] = [];
	// for (let i = 0; i < flagMatchList.length; i++) {
	// 	let match = flagMatchList[i];
	// 	if (
	// 		!match || 
	// 		(flagMatchList[i + 1] && match.index >= flagMatchList[i + 1].index) ||
	// 		(flagMatchList[i - 1] && match.index <= flagMatchList[i - 1].index)
	// 	)
	// 	{ continue; }

	// 	const flag = match[0];
	// 	const index = match.index;
	// 	// out = out.slice(0, index) + flag + out.slice(index);
	// 	console.log(`index: ${index} | currentIndex: ${positionIndex} | out: ${out}`, [flag])
	// 	// console.log(`out: ${out}`, [flag])
	// 	// logTable.push({data: { index: index, currentIndex: positionIndex}, out: out, flag: [flag]})
		
	// 	out = out.slice(0, index + positionIndex) + flag + out.slice(index + positionIndex);
	// 	positionIndex += flag.length;
	// }
	// console.table(logTable.map((e) => e.data));

// console.log('\n---- After ----\n', out, '\n')