export interface Color {
	R: number;
	G: number;
	B: number;
}
interface IColorData {
	[name: string]: {[key: string]: string};
}
interface IColorCodes {
	[key: string]: number[];
}

export const colors: Record<string, Color> = {
	black: { R: 0, G: 0, B: 0 },
	white: { R: 255, G: 255, B: 255 },

	red: { R: 255, G: 0, B: 0 },
	green: { R: 0, G: 255, B: 0 },
	blue: { R: 0, G: 0, B: 255 },

	yellow: { R: 255, G: 255, B: 0 },
	cyan: { R: 0, G: 255, B: 255 },
	magenta: { R: 255, G: 0, B: 255 },
	gray: { R: 128, G: 128, B: 128 },
	orange: { R: 255, G: 165, B: 0 },
	pink: { R: 255, G: 192, B: 203 },
	purple: { R: 128, G: 0, B: 128 },
	
	lime: { R: 0, G: 255, B: 0 },
	teal: { R: 0, G: 128, B: 128 },
	lavender: { R: 230, G: 230, B: 250 },
	brown: { R: 165, G: 42, B: 42 },
	beige: { R: 245, G: 245, B: 220 },
	maroon: { R: 128, G: 0, B: 0 },
	mint: { R: 62, G: 180, B: 137 },
	olive: { R: 128, G: 128, B: 0 },
	coral: { R: 255, G: 127, B: 80 },
	navy: { R: 0, G: 0, B: 128 },
	grey: { R: 128, G: 128, B: 128 }
};

export const tags: IColorData = {
	style: {
        reset: "\x1b[0m",
        bold: "\x1b[1m",
        dim: "\x1b[2m",
        underscore: "\x1b[4m",
        blink: "\x1b[5m",
        inverse: "\x1b[7m",
        hidden: "\x1b[8m",
    },
    fg: {
        black: "\x1b[30m",
        red: "\x1b[31m",
        green: "\x1b[32m",
        yellow: "\x1b[33m",
        blue: "\x1b[34m",
        magenta: "\x1b[35m",
        cyan: "\x1b[36m",
        white: "\x1b[37m",
    },
    bg: {
        black: "\x1b[40m",
        red: "\x1b[41m",
        green: "\x1b[42m",
        yellow: "\x1b[43m",
        blue: "\x1b[44m",
        magenta: "\x1b[45m",
        cyan: "\x1b[46m",
        white: "\x1b[47m",
    },
}

//! Do we need this? Ill keep it for now because it might be useful
//#region  Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)
	//? Source: https://www.npmjs.com/package/colors?activeTab=code
	export const styles: any = {};
	const colorCodes: IColorCodes = {
		reset: [0, 0],

		bold: [1, 22],
		dim: [2, 22],
		italic: [3, 23],
		underline: [4, 24],
		blink: [5, 25],
		flash: [6, 26],
		inverse: [7, 27],
		hidden: [8, 28],
		strikethrough: [9, 29],

		black: [30, 39],
		red: [31, 39],
		green: [32, 39],
		yellow: [33, 39],
		blue: [34, 39],
		magenta: [35, 39],
		cyan: [36, 39],
		white: [37, 39],
		gray: [90, 39],
		grey: [90, 39],

		brightRed: [91, 39],
		brightGreen: [92, 39],
		brightYellow: [93, 39],
		brightBlue: [94, 39],
		brightMagenta: [95, 39],
		brightCyan: [96, 39],
		brightWhite: [97, 39],

		bgBlack: [40, 49],
		bgRed: [41, 49],
		bgGreen: [42, 49],
		bgYellow: [43, 49],
		bgBlue: [44, 49],
		bgMagenta: [45, 49],
		bgCyan: [46, 49],
		bgWhite: [47, 49],
		bgGray: [100, 49],
		bgGrey: [100, 49],

		bgBrightRed: [101, 49],
		bgBrightGreen: [102, 49],
		bgBrightYellow: [103, 49],
		bgBrightBlue: [104, 49],
		bgBrightMagenta: [105, 49],
		bgBrightCyan: [106, 49],
		bgBrightWhite: [107, 49],

		// legacy styles for colors pre v1.0.0
		blackBG: [40, 49],
		redBG: [41, 49],
		greenBG: [42, 49],
		yellowBG: [43, 49],
		blueBG: [44, 49],
		magentaBG: [45, 49],
		cyanBG: [46, 49],
		whiteBG: [47, 49],
	}
	Object.keys(colorCodes).forEach(function(key) {
		let val = colorCodes[key];
		let style: any = styles[key] = [];
		style.open = '\u001b[' + val[0] + 'm';
		style.close = '\u001b[' + val[1] + 'm';
		style.full = style.open + key + ' --' + style.close;
		style.string = ('\\u001b[' + val[0] + 'm ') + style.full + ' \\u001b[' + val[1] + 'm';
	});
//#endregion

//#region Methods

/** 
 * @param {string} input The color. supports: hex (#123ABC), named colors (see src\handlers\colorHandler.ts colors)
 * @returns {Color} The RGB value of the color
*/
export function hexToRgb(input: string): {R: number, G: number, B: number} {
	if (input in colors) {
		return colors[input];
	}

	const regex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
	const result = regex.exec(input);
	
	if (!result) {
		return {R: 0, G: 0, B: 0}; //? Invalid input, return null or throw an error
	}
	
	const red = parseInt(result[1], 16);
	const green = parseInt(result[2], 16);
	const blue = parseInt(result[3], 16);
	
	return {R: red, G: green, B: blue};
}

export function getColorCodePrefix(hex: string): string {
	//? credits to new_duck - twitch viewer
	const color = hexToRgb(hex);
	return `\x1b[38;2;${color.R};${color.G};${color.B}m`
}

export function getColoredString(input: string, color: string): string {
	return `${getColorCodePrefix(color)}${input}${tags.style.reset}`
}

//#endregion

const AutoColorStringData = {}