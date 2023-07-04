export interface IColor {
	R: number;
	G: number;
	B: number;
}

//? This function is used to keep intellisence working when referencing the colors object
function asColors<T extends Record<string, IColor>>(arg: T): T { return arg; }
export const colors = asColors({
	transparent: { R: 0, G: 0, B: 0 },

	black: { R: 0, G: 0, B: 0 },
	white: { R: 255, G: 255, B: 255 },

	//#region Primary
	red: { R: 255, G: 0, B: 0 },
	green: { R: 0, G: 255, B: 0 },
	blue: { R: 0, G: 0, B: 255 },
	//#endregion

	//#region Secondary
	yellow: { R: 255, G: 255, B: 0 },
	cyan: { R: 0, G: 255, B: 255 },
	magenta: { R: 255, G: 0, B: 255 },
	gray: { R: 128, G: 128, B: 128 },
	orange: { R: 255, G: 165, B: 0 },
	pink: { R: 255, G: 192, B: 203 },
	purple: { R: 128, G: 0, B: 128 },
	//#endregion
	
	//#region Extended
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
	grey: { R: 128, G: 128, B: 128 },
	//#endregion
});

/** 
 * @param {IColor} color The color to set transparency on
 * @returns {void}
 * @description Sets the transparent color (the background color of the console)
*/
export function setTransparency(color: IColor): void {
	colors.transparent = {R: color.R, G: color.G, B: color.B};
}

function asStyles<T extends Record<string, string>>(arg: T): T { return arg; }
export const styles = asStyles({
	reset: "\x1b[0m",
	bold: "\x1b[1m",
	dim: "\x1b[2m",
	underscore: "\x1b[4m",
	blink: "\x1b[5m",
	inverse: "\x1b[7m",
	hidden: "\x1b[8m",
});

export interface IThemeParameters {
	/** @param {IColor|string} foreground The foreground color */
	foreground: IColor|string; //? color or hex
	/** @param {IColor|string|null} background The background color */
	background: IColor|string|null; //? color or hex
	/** @param {string|string[]|null} style The style or styles */
	style: string|string[]|null; //? style or styles
}
export class Theme {
	public foreground: IColor|string; //? color or hex
	public background: IColor|string|null; //? color or hex
	public background: IColor|string|null|undefined; //? color or hex
	public style: string[]; //? style or styles

	/** 
	 * @param {IThemeParameters} input
	 * @param {IColor} input.foreground The foreground color
	 * @param {IColor} input.background The background color
	 * @param {string[]} input.style The style or styles
	 * @param {IColor|string} foreground The foreground color
	 * @param {IColor|string|null} background The background color
	 * @param {string|string[]|null} style The style or styles
	 * @returns {Theme} The theme
	*/
	constructor(input: IThemeParameters = {foreground: 'white', background: null, style: null}) {
		this.foreground = input.foreground;
		this.background = input.background;
	constructor(foreground: IColor|string = '#ffffff', background?: IColor|string|null, style?: string|string[]|null) {
		this.foreground = foreground;
		this.background = background ?? null;
		this.style = [];
		if (Array.isArray(input.style)) {
			this.style = input.style;
		if (Array.isArray(style)) {
			this.style = style;
		}
		else if (typeof input.style === "string") {
			this.style.push(input.style);
		else if (typeof style === "string") {
			this.style.push(style);
		}

		this.validate();
	}

	private validate() {
		if (typeof this.foreground === "string") { this.foreground = getColor(this.foreground); }
		if (typeof this.background === "string") { this.background = getColor(this.background); }
		for (let i = 0; i < this.style.length; i++) {
			if (Object.keys(styles).includes(this.style[i])) {
				this.style[i] = styles[this.style[i] as keyof typeof styles];
			}
			else if (Object.values(styles).includes(this.style[i])) {
				continue;
			}
			else {
				console.warn(`Invalid style input: ${this.style[i]}`);
				this.style.splice(i, 1);
			}
		}
	}
}

// string: {
// 	default: IThemeParameters|Theme,
// 	overrides: [{ target: string, theme: IThemeParameters|Theme }] //? Overrides for specific strings e.g. "string": { "true": { foreground: "red" } }
// };
// number: {
// 	default: IThemeParameters|Theme,
// };
// boolean: {
// 	default: IThemeParameters|Theme,
// };
// object: {
// 	default: IThemeParameters|Theme,
// 	key: IThemeParameters|Theme,
// 	value: { typeOverride: boolean, theme: IThemeParameters|Theme },
// 	brackets: IThemeParameters|Theme,
// 	punctuation: IThemeParameters|Theme,
// };
// array: {
// 	default: IThemeParameters|Theme,
// 	value: { typeOverride: boolean, theme: IThemeParameters|Theme },
// 	brackets: IThemeParameters|Theme,
// 	punctuation: IThemeParameters|Theme,
// };
// }

export interface ITypeThemes {
	[key: string]: {
		[key: string]: Theme | 
		{[key: string]: string | Theme}[] |
		{[key: string]: boolean | Theme};
	}
}

export class Typethemes { 

	public string: {
		default: Theme,
		overrides: {target: string, theme: Theme}[]
	};
	public number: { default: Theme };
	public boolean: { default: Theme };
	public object: {
		default: Theme,
		key: Theme,
		value: { typeOverride: boolean, theme: Theme },
		brackets: Theme,
		punctuation: Theme,
	};
	public array: {
		default: Theme,
		value: { typeOverride: boolean, theme: Theme },
		brackets: Theme,
		punctuation: Theme,
	};

	constructor(input: Partial<Typethemes> = {}, fallbackTheme: Theme = new Theme()) {
		this.string = {
			default: (input.string?.default instanceof Theme) ? input.string?.default : fallbackTheme,
			overrides: input.string?.overrides.map((e) => {
				return {
					target: e.target,
					theme: (e.theme instanceof Theme) ? e.theme : fallbackTheme
				}
			}) ?? [],
		};
		this.number = { default: (input.number?.default instanceof Theme) ? input.number?.default : fallbackTheme};
		this.boolean = { default: (input.boolean?.default instanceof Theme) ? input.boolean?.default : fallbackTheme};
		this.object = {
			default: (input.object?.default instanceof Theme) ? input.object?.default : fallbackTheme,
			key: (input.object?.key instanceof Theme) ? input.object?.key : fallbackTheme,
			value: {
				typeOverride: input.object?.value.typeOverride ?? true,
				theme: (input.object?.value.theme instanceof Theme) ? input.object?.value.theme : fallbackTheme
			},
			brackets: (input.object?.brackets instanceof Theme) ? input.object?.brackets : fallbackTheme,
			punctuation: (input.object?.punctuation instanceof Theme) ? input.object?.punctuation : fallbackTheme,
		};
		this.array = {
			default: (input.array?.default instanceof Theme) ? input.array?.default : fallbackTheme,
			value: {
				typeOverride: input.array?.value.typeOverride ?? true,
				theme: (input.array?.value.theme instanceof Theme) ? input.array?.value.theme : fallbackTheme
			},
			brackets: (input.array?.brackets instanceof Theme) ? input.array?.brackets : fallbackTheme,
			punctuation: (input.array?.punctuation instanceof Theme) ? input.array?.punctuation : fallbackTheme,
		};
	}
}

export class ColorProfile {
	public name: string;
	public theme: Theme;
	public typeThemes: Typethemes;
	
	constructor(name: string, input: Partial<ColorProfile>) {
		this.name = name;
		this.theme = new Theme(input.theme);
		
		this.typeThemes = (input.typeThemes) ? new Typethemes(input.typeThemes) : new Typethemes();
	}
}

export const defaultColorProfile = new ColorProfile('default', {
	name: "default",
	theme: {
		foreground: '#ffffff',
		background: 'pink',
		style: 'bold'
	},
	typeThemes: {
		string: {
			default: {
				foreground: '#ff9900',
				background: '#181818',
				style: 'underscore'
			},
			overrides: [
				{
					target: 'ctn', 
					theme: {
						foreground: colors.blue,
						background: colors.cyan,
						style: ['bold', 'underscore']
					},
				}
			]
		},
	}
} as unknown as ColorProfile);

//#region Methods

/** 
 * @param {string} input The color. supports: hex (#123ABC) or named colors (red, blue, etc.)
 * @returns {IColor} The RGB value of the color
*/
export function getColor(input: string): {R: number, G: number, B: number} {
	if (input in colors) {
		return colors[input as keyof typeof colors];
	}

	const regex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
	const result = regex.exec(input);
	
	if (!result) {
		console.warn(`Invalid color input: ${input}`);
		return {R: 0, G: 0, B: 0}; //? Invalid input, return null or throw an error
	}
	
	const red = parseInt(result[1], 16);
	const green = parseInt(result[2], 16);
	const blue = parseInt(result[3], 16);
	
	return {R: red, G: green, B: blue};
}
export function createTheme(foreground: IColor|string, background: IColor|string|null, style: string|string[]|null): Theme {
	if (typeof foreground === "string") { foreground = getColor(foreground); }
	if (typeof background === "string") { background = getColor(background); }
	if (Array.isArray(style)) {
		for (let i = 0; i < style.length; i++) {
			if (Object.keys(styles).includes(style[i])) {
				style[i] = styles[style[i] as keyof typeof styles];
			}
			else if (Object.values(styles).includes(style[i])) {
				continue;
			}
			else {
				console.warn(`Invalid style input: ${style[i]}`);
				style.splice(i, 1);
			}
		}
	}
	return new Theme({
		foreground: foreground,
		background: background,
		style: style
	});
}

export function getColorCodePrefix(hex: string): string {
	//? credits to new_duck - twitch viewer
	const color = getColor(hex);
	return `\x1b[38;2;${color.R};${color.G};${color.B}m`
}

export function getColoredString(input: string, color: string): string {
	return `${getColorCodePrefix(color)}${input}${styles.reset}`
}

//#endregion
