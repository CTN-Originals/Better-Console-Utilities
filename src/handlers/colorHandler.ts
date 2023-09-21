import {
	replaceAll,
} from '../utils';

const colorFlagRegex = new RegExp(/\x1b\[38;2(?<rbg>(;\d{1,3}){3})m/g); //? Matches \x1b[38;2;255;255;255m colors
const styleFlagRegex = new RegExp(/\x1b\[\d{1}m/g); //? Matches \x1b[0m styles
const anyFlagRegex = new RegExp(/\x1b\[((3|4)8|\d{1})(;2(;\d{1,3}){3})?m/g); //? Matches all flags

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

    public get style(): string[] {
        return this._style;
    }

    public set style(value: string|string[]) {
        this._style = (Array.isArray(value)) ? value : [value];
        this.validate();
    }

	/** 
	 * @param {...string} style The style or styles names to add (e.g. 'bold', 'underscore', etc.)
	*/
	public addStyle(...style: string[]) {
		this._style.push(...style);
		this.validate();
	}
	/** 
	 * @param {...string} style The style or styles names to remove (e.g. 'bold', 'underscore', etc.)
	*/
	public removeStyle(...style: string[]) {
		for (const s of style) {
			const styleFlag = styles[s as keyof typeof styles];
			console.log(style)
			const index = this._style.findIndex((e) => e === styleFlag);
			if (index !== -1) {
				this._style.splice(index, 1);
			}
		}
	}

	/** 
	 * @param {string} input The string to apply the theme to
	 * @returns {string} The themed string (e.g. \x1b[38;2;255;0;0m$Hello World\x1b[0m)
	*/
	public getThemedString(input: string): string {
		const fg = (this.foreground != null && this.foreground != colors.transparent) ? getColorCodePrefix(this.foreground) : '';
		const bg = (this.background != null && this.background != colors.transparent) ? getColorCodePrefix(this.background, false) : '';
		const style = (this.style.length > 0) ? this.style.join('') : '';
		if (fg === '' && bg === '' && style === '') return input;
		return `${fg}${bg}${style}${input}${styles.reset}`
	}

	public getColorNames(): { foreground: string, background: string } {
		const keys = Object.keys(colors);
		let fg = '';
		let bg = '';
		for (const key of keys) {
			if (colors[key as keyof typeof colors] === this.foreground) {
				fg = key;
			}
			else if (colors[key as keyof typeof colors] === this.background) {
				bg = key;
			}
		}

		if (fg === '') fg = this.foreground.asHex;
		if (bg === '') bg = this.background.asHex;

		return { foreground: fg, background: bg };
	}

	public get themeFlags(): string {
		let out = '';
		if (this.foreground != null && this.foreground != colors.transparent) {
			out += getColorCodePrefix(this.foreground);
		}
		if (this.background != null && this.background != colors.transparent) {
			out += getColorCodePrefix(this.background, false);
		}
		if (this.style.length > 0) {
			out += this.style.join('');
		}
		return out;
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
export class TypeThemes { 

	public string: { default: Theme };
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
	 * @param {Partial<TypeThemes>} input The color profile
	 * @param {Theme} fallbackTheme The theme to use if a theme is not provided
	*/
	constructor(input: Partial<TypeThemes> = {}, fallbackTheme: Theme = new Theme()) {
		this.string = { default: (input.string?.default instanceof Theme) ? input.string?.default : fallbackTheme };
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
export class ThemeOverride {
	public target: string|string[]|RegExp|RegExp[];
	public theme: Theme;

	/** 
	 * @param {string|RegExp} target The target string or regex
	 * @param {Theme} theme The theme to apply if the target is matched
	*/
	constructor(target: string|RegExp, theme: Theme = new Theme()) {
		this.target = target;
		this.theme = theme;
	}

	public apply(input: string, resetTheme: Theme = new Theme('#ffffff')): string {
		//! 
			//TODO Sudo code with comments to explain every single step
		//! 

		//? if target is an array, run apply on each element
		if (Array.isArray(this.target)) {
			for (const target of this.target) {
				input = this.apply(input);
			}
			return input;
		}
		
		let rawInput = input;

		//? remove flag from input
		const flagMatchList: any[] = []
		const matchList = input.match(anyFlagRegex);
		// matchList?.push(...input.match(styleFlagRegex) ?? []);
		if (matchList !== null) {
			// console.log(matchList)
			for (let match of matchList) {
				if (!match) { continue; }
				match = match.replace('[', '\\[');
				const reg = new RegExp(match);
				const exec = reg.exec(input);
				if (!exec) { continue; }

				if (flagMatchList.find((e) => e.index === exec.index)) { 
					//? Array of matches includes a match with the same index, overwrite it
					const index = flagMatchList.findIndex((e) => e.index === exec.index); 
				}
				else {
					flagMatchList.push(exec);
				}
				// input = input.replace(exec[0], '');
			}
			// input = input.replace(colorFlagRegex, '');
			// input = input.replace(styleFlagRegex, '');
			input = input.replace(anyFlagRegex, '');
		}
		let out = input;
				
		//? if target is a regex
		if (this.target instanceof RegExp) {
			const match = out.match(this.target);
			if (match != null) {
				let matchOut = out;
				for (const m of match) {
					// console.log('if target == RegExp: ' + m + ' | ' + this.target);
					matchOut = matchOut.replace(m, this.getThemedString(m, resetTheme));
				}
				out = matchOut;
			}
		}
		else {
			// console.log('else: ' + input);
			if (input.includes(this.target)) {
				const position = [input.indexOf(this.target), input.indexOf(this.target) + this.target.length];
				out =  replaceAll(input, this.target, this.getThemedString(this.target, resetTheme));
			}
		}
		if (out === input) { 
			//? no matches, return input
			// console.log('no matches')
			// console.log([out + ' | ' + input, rawInput])
			// console.log(' ')
			return rawInput;
		}

		console.log(flagMatchList)
		console.log(rawInput.split('\x1b'))

		//? add the flag back to the input
		console.log('\n---- Before ----\n', out, '\n')

		const preConstruct = [];
		const usedFlags = [];
		
		let positionIndex = 0;
		for (let i = 0; i < flagMatchList.length; i++) {
			let match = flagMatchList[i];
			
			const flag = match[0];
			const index = match.index + 1; //TODO
			if (flagMatchList[i - 1] && index <= flagMatchList[i - 1].index) {
				positionIndex += flag.length + 1; //TODO
				// positionIndex += indexAdition;
				// console.log(`skipping: index: ${match?.index} | currentIndex: ${positionIndex} | out: ${out}`, match)
				continue;
			}
			// console.log(`index: ${index} | currentIndex: ${positionIndex} | out: ${out}`, [flag])
			
			preConstruct.push(out.slice(0, index + positionIndex) + flag + out.slice(index + positionIndex))
			usedFlags.push({ index: index, flag: flag });

			out = out.slice(0, index + positionIndex) + flag + out.slice(index + positionIndex);
			positionIndex += flag.length; //TODO
			// positionIndex = out.split('\x1b').length;
		}
		// console.log(preConstruct)
		console.log('---- After ----\n', out, preConstruct, usedFlags, '\n')

		return out;
	}

	public getThemedString(input: string, resetTheme: Theme = new Theme('#ffffff')): string {
		return this.theme.themeFlags + input + resetTheme.themeFlags;
	}
}

export class ThemeProfile {
	public name: string;
	public default: Theme;
	public typeThemes: TypeThemes;
	public overrides: ThemeOverride[];
	
	constructor(name: string, input: Partial<ThemeProfile>) {
		this.name = name;
		this.default = new Theme(input.default?.foreground, input.default?.background, input.default?.style);
		
		this.typeThemes = (input.typeThemes) ? new TypeThemes(input.typeThemes) : new TypeThemes();
		this.overrides = (input.overrides) ? input.overrides : [];
	}

	public applyOverrides(input: string): string {
		for (const override of this.overrides) {
			//TODO: apply all overrides but find a way to merge the results
			input = override.apply(input);
		}
		return input;
	}
}
//#endregion

export const defaultColorProfile = new ThemeProfile('default', {
	name: "default",
	default: new Theme('#ffffff', null),
	typeThemes: {
		string: { default: new Theme('#C4785B', null) },
		number: { default: new Theme('#B5CEA8') },
		boolean: { default: new Theme('#569CD6') },
		object: {
			default: new Theme('#9CDCFE'),
			key: new Theme('#569CD6', null, 'bold'),
			value: { typeOverride: true, theme: new Theme('#9CDCFE') },
			brackets: new Theme('#aaaaaa'),
			punctuation: new Theme('#808080'),
		},
		array: {
			default: new Theme('#9CDCFE'),
			value: { typeOverride: true, theme: new Theme('#9CDCFE') },
			brackets: new Theme('#aaaaaa'),
			punctuation: new Theme('#808080'),
		}
	},
	overrides: [
		new ThemeOverride(/(['"`])(?:\\\1|.)*?\1/g, new Theme('#C4785B')),
		new ThemeOverride(/[0-9]+/g, new Theme('#B5CEA8')),
		new ThemeOverride(/ctn/gi, new Theme('#00FFFF', '#008000')),
		new ThemeOverride('name', new Theme('#ff0000')),
		new ThemeOverride('red', new Theme('#ff0000')),
		new ThemeOverride('green', new Theme('#00ff00')),
		new ThemeOverride('blue', new Theme('#0000ff')),
	]
} as unknown as ThemeProfile);

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