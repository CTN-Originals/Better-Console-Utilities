export interface IColor {
	R: number;
	G: number;
	B: number;
}

//#region Static Definitions
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
//#endregion

//#region Theme Class
export class Theme {
	public foreground: IColor|string; //? color or hex
	public background: IColor|string|null|undefined; //? color or hex
	public style: string[]; //? style or styles

	/** 
	 * @param {IColor|string} foreground The foreground color
	 * @param {IColor|string|null} background The background color
	 * @param {string|string[]|null} style The style or styles
	 * @returns {Theme} The theme
	*/
	constructor(foreground: IColor|string = '#ffffff', background?: IColor|string|null, style?: string|string[]|null) {
		this.foreground = foreground;
		this.background = background ?? null;
		this.style = [];
		if (Array.isArray(style)) {
			this.style = style;
		}
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
//#endregion

//#region ColorProfile Classes
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
		this.theme = new Theme(input.theme?.foreground, input.theme?.background, input.theme?.style);
		
		this.typeThemes = (input.typeThemes) ? new Typethemes(input.typeThemes) : new Typethemes();
	}
}
//#endregion

export const defaultColorProfile = new ColorProfile('default', {
	name: "default",
	theme: new Theme('#ffffff', null, 'reset'),
	typeThemes: {
		string: {
			default: new Theme('#C4785B', null, 'reset'),
			overrides: [
				{ target: 'ctn', theme: new Theme(colors.blue, colors.cyan, ['bold', 'underscore']) }
			]
		},
		number: { default: new Theme('#B5CEA8') },
		boolean: { default: new Theme('#569CD6') },
		object: {
			default: new Theme('#9CDCFE'),
			key: new Theme('#569CD6', null, 'bold'),
			value: { typeOverride: true, theme: new Theme('#9CDCFE') },
			brackets: new Theme('#eaeaea'),
			punctuation: new Theme('#cacaca'),
		},
		array: {
			default: new Theme('#9CDCFE'),
			value: { typeOverride: true, theme: new Theme('#9CDCFE') },
			brackets: new Theme('#eaeaea'),
			punctuation: new Theme('#cacaca'),
		}
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

export function getColorCodePrefix(hex: string): string {
	//? credits to new_duck - twitch viewer
	const color = getColor(hex);
	return `\x1b[38;2;${color.R};${color.G};${color.B}m`
}
export function getColoredString(input: string, color: string): string {
	return `${getColorCodePrefix(color)}${input}${styles.reset}`
}

//#endregion
