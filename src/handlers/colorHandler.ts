export class Color {
	public R: number;
	public G: number;
	public B: number;
	
	constructor(input: { R: number, G: number, B: number });
	constructor(r: number, g: number, b: number);
	constructor(hex: string);
	constructor(inputOrR: { R: number, G: number, B: number } | number | string, g?: number, b?: number) {
		if (typeof inputOrR === "number") {
			this.R = inputOrR;
			this.G = g!;
			this.B = b!;
		} 
		else if (typeof inputOrR === "string") {
			const rgb = getColor(inputOrR);
			this.R = rgb.R;
			this.G = rgb.G;
			this.B = rgb.B;
		}
		else {
			this.R = inputOrR.R;
			this.G = inputOrR.G;
			this.B = inputOrR.B;
		}
	}

	public get asArray(): number[] { return [this.R, this.G, this.B]; }
	public get asHex(): string {
		return `#${this.R.toString(16).padStart(2, '0')}${this.G.toString(16).padStart(2, '0')}${this.B.toString(16).padStart(2, '0')}`;
	}
	
	public seturate(amount: number): Color {
		const r = Math.round(Math.min(Math.max(0, this.R * amount), 255));
		const g = Math.round(Math.min(Math.max(0, this.G * amount), 255));
		const b = Math.round(Math.min(Math.max(0, this.B * amount), 255));
		return new Color(r, g, b);
	}
}

//#region Static Definitions
//? This function is used to keep intellisence working when referencing the colors object
function asColors<T extends Record<string, Color>>(arg: T): T { return arg; }
export const colors = asColors({
	transparent: new Color({ R: -1, G: -1, B: -1 }),

	black: new Color({ R: 0, G: 0, B: 0 }),
	white: new Color({ R: 255, G: 255, B: 255 }),

	//#region Primary
	red: new Color({ R: 255, G: 0, B: 0 }),
	green: new Color({ R: 0, G: 255, B: 0 }),
	blue: new Color({ R: 0, G: 0, B: 255 }),
	//#endregion

	//#region Secondary
	yellow: new Color({ R: 255, G: 255, B: 0 }),
	cyan: new Color({ R: 0, G: 255, B: 255 }),
	magenta: new Color({ R: 255, G: 0, B: 255 }),
	gray: new Color({ R: 128, G: 128, B: 128 }),
	orange: new Color({ R: 255, G: 165, B: 0 }),
	pink: new Color({ R: 255, G: 192, B: 203 }),
	purple: new Color({ R: 128, G: 0, B: 128 }),
	//#endregion
	
	//#region Extended
	lime: new Color({ R: 0, G: 255, B: 0 }),
	teal: new Color({ R: 0, G: 128, B: 128 }),
	lavender: new Color({ R: 230, G: 230, B: 250 }),
	brown: new Color({ R: 165, G: 42, B: 42 }),
	beige: new Color({ R: 245, G: 245, B: 220 }),
	maroon: new Color({ R: 128, G: 0, B: 0 }),
	mint: new Color({ R: 62, G: 180, B: 137 }),
	olive: new Color({ R: 128, G: 128, B: 0 }),
	coral: new Color({ R: 255, G: 127, B: 80 }),
	navy: new Color({ R: 0, G: 0, B: 128 }),
	grey: new Color({ R: 128, G: 128, B: 128 }),
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
	public foreground: Color; //? color or hex
	public background: Color; //? color or hex
	private _style: string[]; //? style or styles

	/** 
	 * @param {Color|string|null} foreground The foreground color
	 * @param {Color|string|null} background The background color
	 * @param {string|string[]|null} style The style or styles
	 * @returns {Theme} The theme
	*/
	constructor(foreground: Color|string|null = colors.transparent, background?: Color|string|null, style?: string|string[]|null) {
        this.foreground = (foreground instanceof Color) ? foreground : (foreground) ? getColor(foreground) : colors.transparent;
        this.background = (background instanceof Color) ? background : (background) ? getColor(background) : colors.transparent;
        this._style = (Array.isArray(style)) ? style : (style) ? [style] : [];

        this.validate();
    }
		this.validate();
	}
			}
		}
	}

    private validate() {
        for (let i = 0; i < this._style.length; i++) {
            if (Object.keys(styles).includes(this._style[i])) {
                this._style[i] = styles[this._style[i] as keyof typeof styles];
            }
            else if (Object.values(styles).includes(this._style[i])) {
                continue;
            }
            else {
                console.warn(`Invalid style input: ${this._style[i]}`);
                this._style.splice(i, 1);
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

	/** 
	 * @param {Partial<Typethemes>} input The color profile
	 * @param {Theme} fallbackTheme The theme to use if a theme is not provided
	*/
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

	//#region Getters
		/** 
		 * @param {string} input The color. supports: hex (#123ABC) or named colors (red, blue, etc.)
		 * @returns {Color} The RGB value of the color
		*/
		export function getColor(input: string): Color {
			if (input in colors) {
				return colors[input as keyof typeof colors];
			}

			const regex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
			const result = regex.exec(input);
			
			if (!result) {
				console.warn(`Invalid color input: ${input}`);
				return colors.transparent; //? Invalid input, return null or throw an error
			}
			
			const red = parseInt(result[1], 16);
			const green = parseInt(result[2], 16);
			const blue = parseInt(result[3], 16);
			
			return new Color(red, green, blue);
		}

		export function getColorCodePrefix(color: Color|string, fgColor: boolean = true): string {
			//? credits to new_duck - twitch viewer
			if (typeof color === 'string') color = getColor(color);
			
			var flag =  `\x1b[38;2;`
			if (!fgColor) flag = `\x1b[48;2;`
				
			return `${flag}${color.R};${color.G};${color.B}m`
		}
		export function getColoredString(input: string, color: string): string {
			return `${getColorCodePrefix(color)}${input}${styles.reset}`
		}
		export function getThemedString(input: string, theme: Theme): string {
			const fg = (theme.foreground != null) ? getColorCodePrefix(theme.foreground) : '';
			const bg = (theme.background != null) ? getColorCodePrefix(theme.background, false) : '';
			const style = (theme.style.length > 0) ? theme.style.join('') : '';
			if (fg === '' && bg === '' && style === '') return input;
			return `${fg}${bg}${style}${input}${styles.reset}`
		}
	//#endregion

//#endregion
