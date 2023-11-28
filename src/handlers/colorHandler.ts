const colorFlagRegex = new RegExp(/\x1b\[(3|4)8;2(?<rbg>(;\d{1,3}){3})m/g); //? Matches \x1b[38;2;255;255;255m colors
const styleFlagRegex = new RegExp(/\x1b\[\d{1}m/g); //? Matches \x1b[0m styles
const anyFlagRegex = new RegExp(/\x1b\[((3|4)8|\d{1})(;2(;\d{1,3}){3})?m/g); //? Matches all flags
const anyThemedString = new RegExp(
	/(?<start>\x1b)(?<flags>(?<fg>(?:\x1b)?\[38;2(?:(?:;\d{1,3}){3})m)?(?<bg>(?:\x1b)?\[48;2(?:(?:;\d{1,3}){3})m)?(?<st>(?:\x1b)?\[(?:\d{1}m))*)(?<str>\x1b\[0m|.*?)(?<end>\x1b\[0m(?:\x1b\[38;2(?:(?:;\d{1,3}){3})m)?)/g
)

const placeholderCharacter: string = '◘'; //? character that is used as a placeholder for color flags to prevent the flags from being colored by overrides

type RGB = { R: number, G: number, B: number };
export class Color {
	public R: number;
	public G: number;
	public B: number;
	
	/** @param {RGB} input The RGB value of the color (e.g. { R: 255, G: 0, B: 0 } = red) */
	constructor(input: { R: number, G: number, B: number });
	/** 
	 * @param {number} r The red value of the color
	 * @param {number} g The green value of the color
	 * @param {number} b The blue value of the color
	*/
	constructor(r: number, g: number, b: number);
	/** @param {string} hex The hex value of the color (e.g. '#ffffff' or 'white') */
	constructor(hex: string);
	constructor(input_Red_Hex: RGB | number | string, g?: number, b?: number) {
		if (typeof input_Red_Hex === "number") {
			this.R = input_Red_Hex;
			this.G = g!;
			this.B = b!;
		} 
		else if (typeof input_Red_Hex === "string") {
			const rgb = getColor(input_Red_Hex);
			this.R = rgb.R;
			this.G = rgb.G;
			this.B = rgb.B;
		}
		else {
			this.R = input_Red_Hex.R;
			this.G = input_Red_Hex.G;
			this.B = input_Red_Hex.B;
		}
	}

	public get asArray(): number[] { return [this.R, this.G, this.B]; }
	public get asHex(): string {
		return `#${this.R.toString(16).padStart(2, '0')}${this.G.toString(16).padStart(2, '0')}${this.B.toString(16).padStart(2, '0')}`;
	}
	
	/** @param {number} amount The amount to seturate the color by (e.g. 1.5 to seturate by 50% or 0.5 to desaturate by 50%) */
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
	const colors = asColors({
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
	const styles = asStyles({
		reset: "\x1b[0m",
		bold: "\x1b[1m",
		dim: "\x1b[2m",
		underscore: "\x1b[4m",
		underline: "\x1b[4m",
		blink: "\x1b[5m",
		inverse: "\x1b[7m",
		hidden: "\x1b[8m",
	});
//#endregion

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

//#region ColorProfile Classes
export class TypeThemes { 

	public string: { default: Theme };
	public number: { default: Theme };
	public boolean: { default: Theme };
	public object: {
		default: Theme,
		key: Theme,
		value: { typeOverride: boolean /*TODO*/, theme: Theme },
		brackets: Theme, //TODO
		punctuation: Theme, //TODO
	};
	public array: {
		default: Theme,
		value: { typeOverride: boolean /*TODO*/, theme: Theme },
		brackets: Theme, //TODO
		punctuation: Theme, //TODO
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

class ThemeOverrideMatch {
	public target: string; //? The actual flag string (e.g. "hello world" to apply string color)
	public input: string; //? The entire string
	public override: ThemeOverride; //? The theme override that was used to capture the flag
	public capture: RegExp|string; //? The regex that was used to capture the flag
	public groups: RegExpExecArray['groups']|null; //? The groups of the regex that was used to capture the flag

	public index: number; //? The index of the flag (position in the string)
	public length: number; //? The length of the flag (how many characters it is)

	constructor(input: ThemeOverrideMatch) {
		this.target = input.target;
		this.input = input.input;
		this.override = input.override;
		this.capture = input.capture;
		this.groups = input.groups;

		this.index = input.index;
		this.length = input.length;
	}
}

export class ThemeOverride {
	public target: string|string[]|RegExp|RegExp[];
	public theme: Theme;

	/** 
	 * @param {string|RegExp} target The target string or regex
	 * @param {Theme} theme The theme to apply if the target is matched
	 * @param {string} theme.foreground The foreground color (e.g. '#ffffff' or 'white')
	 * @param {string} theme.background The background color (e.g. '#ffffff' or 'white')
	 * @param {string|string[]} theme.style The style or styles (e.g. 'bold' or ['bold', 'underscore'])
	 * @returns {ThemeOverride} The theme override
	*/
	constructor(target: string|string[]|RegExp|RegExp[], theme: Theme = new Theme()) {
		this.target = target;
		this.theme = theme;
	}

	/** 
	 * @param {string} input The string to apply the theme to
	 * @param {Theme} resetTheme The theme to use to reset the theme
	 * @returns {string} The themed string (e.g. \x1b[38;2;255;0;0m$Hello World\x1b[0m)
	*/
	public matchTargetInstances(input: string, resetTheme: Theme = new Theme('#ffffff'), targetOverride: string|RegExp|null = null): ThemeOverrideMatch[] {
		//* This function should stay simple and return something with enough information to reconstruct the string with the theme applied
		const matchInstances: ThemeOverrideMatch[] = [];

		//? if target is an array, run apply on each element
		if (Array.isArray(this.target) && targetOverride === null) {
			for (let i = 0; i < this.target.length; i++) {
				const target = this.target[i];
				matchInstances.push(...this.matchTargetInstances(input, resetTheme, target));
			}
			return matchInstances;
		}
		
		//? copy of input for later use
		let safeInput: string = input;
		//? array of all matches
		const matchList: RegExpExecArray[] = [];

		const currentTarget: string|RegExp = (targetOverride) ? targetOverride : this.target as string|RegExp;
		if (currentTarget instanceof RegExp) {
			for (let i = 0; i < safeInput.split(currentTarget).length; i++) {
				const match = currentTarget.exec(safeInput);
				if (!match) { continue; }
				else if (matchList.find((e) => (e.index === match.index) && (e[0].length === match[0].length))) {
					//- if Array of matches includes a match with the same index, overwrite it
					const index = matchList.findIndex((e) => e.index === match.index); 
					matchList[index] = match;
				}
				else {
					matchList.push(match);
				}
			}
		}
		else {
			//? copy of the input to remove all instances of the target and not modify the input
			let inputCopy = safeInput; 
			for (let i = 0; i < safeInput.split(currentTarget as string).length - 1; i++) {
				const fakeMatch = {
					0: currentTarget as string,
					input: safeInput,
					index: inputCopy.indexOf(currentTarget as string),
					length: (currentTarget as string).length,
				} as RegExpExecArray;

				//? replace the target in the copy with a placeholder
				inputCopy = inputCopy.replace(currentTarget as string, (placeholderCharacter).repeat((currentTarget as string).length));
				matchList.push(fakeMatch);
			}
		}

		for (const match of matchList) {
			matchInstances.push(new ThemeOverrideMatch({
				target: match[0],
				input: match.input,
				override: this,
				capture: currentTarget,
				groups: match.groups as RegExpExecArray['groups'] ?? {},
				index: match.index,
				length: match[0].length,
			}));
		}

		return matchInstances;
	}
}

export class ThemeProfile {
	// public name: string; //? The name of the color profile to be used to identify
	public default: Theme; //? The default theme to use if one is not provided
	public typeThemes: TypeThemes; //? The themes to use for each type
	public colorSyntax: RegExp[]; //? The regex patterns to use to find any colored strings
	public overrides: ThemeOverride[]; //? The theme overrides to use
	
	/** 
	 * @param {Partial<ThemeProfile>} input The color profile
	*/
	constructor(input: Partial<ThemeProfile>) {
		// this.name = name;
		this.default = new Theme(input.default?.foreground, input.default?.background, input.default?.style);
		
		this.typeThemes = (input.typeThemes) ? new TypeThemes(input.typeThemes, this.default) : defaultThemeProfile.typeThemes;
		this.colorSyntax = (input.colorSyntax) ? input.colorSyntax : defaultThemeProfile.colorSyntax;
		this.overrides = (input.overrides) ? input.overrides : defaultThemeProfile.overrides;
	}

	public applyThemeProfile(input: string): string {
		input = this.applyColorSyntax(input);
		input = this.applyOverrides(input);
		return input;
	}

	private applyColorSyntax(input: string): string {
		//TODO bug Fix: 
			//> when you dont close off the syntax flag correctly it just colors everything after that the specified color. this could just be a feature that is left in as intended but i rather have it where it would ignore that flag entirely.
		let out = input;
		for (const regex of this.colorSyntax) {
			const matches = input.match(regex);
			if (!matches) { continue; }
			for (const match of matches) {
				const reg = new RegExp(regex).exec(match);
				if (!reg || !reg.groups || !reg.groups.target) { continue; }

				const target = reg.groups.target;

				const fg: Color|null = (reg.groups.ftag) ? getColor(reg.groups.ftag) : null;
				const bg: Color|null = (reg.groups.btag) ? getColor(reg.groups.btag) : null;
				const st: string[]|null = (reg.groups.stag) ? reg.groups.stag.split(',') : null;

				const theme = new Theme(fg, bg, st);

				out = out.replace(reg.groups.flag + target + reg.groups.end, theme.themeFlags + target + styles.reset + this.default.themeFlags);
			}
		}
		// console.log([out])
		// console.log(out.split(/\x1b/g).join('').split('[0m'))
		return out;
	}

	private applyOverrides(input: string): string {
		const overrideMatches: ThemeOverrideMatch[] = [];

		let safeInput: string = input;
		const anyThemeMatch = safeInput.match(anyThemedString);
		if (anyThemeMatch) {
			//? replace any themed string (flag + string + reset) with placeholder characters to prevent the flags from being colored by overrides
			for (const match of anyThemeMatch) {
				safeInput = safeInput.replace(match, placeholderCharacter.repeat(match.length));
			}
		}

		for (let i = 0; i < this.overrides.length; i++) {
			const override = this.overrides[i];
			//? find all matches for each override
			overrideMatches.push(...override.matchTargetInstances(safeInput, this.default));
		}
		overrideMatches.sort((a, b) => a.index - b.index); //? sort override matches by index

		//? merge any matches that share the same override
		for (let i = 0; i < overrideMatches.length; i++) {
			const match = overrideMatches[i];
			const nextMatch = overrideMatches[i + 1];
			if (!nextMatch) { break; }
			if (match.override === nextMatch.override && match.index + match.length === nextMatch.index) {
				match.target += nextMatch.target;
				match.length += nextMatch.length;
				overrideMatches.splice(i + 1, 1);
				i--;
			}
		}
		// console.log(overrideMatches)
		
		//! Any theme flags fuck this process up so any flags are removed from input
		//TODO Make a way around this so any theme flags already preset are also included
		let out = input; //? the input without any theme flags

		const compleatedOverrides: ThemeOverrideMatch[] = []; //? array of all overrides that have been compleated
		const flagPositionArray: {flag: string, index: number}[] = [] //? array of all flag positions for where they should end up in the output string
		for (const match of overrideMatches) {
			let resetTheme = this.default;
			for (const override of compleatedOverrides) {
				if (override.index > match.index) { break; } //? if the override is after the match, skip it
				if (override.index + override.length > match.index) { //? if the override is in the match, set the resetTheme to the override theme
					resetTheme = override.override.theme;
				}
			}
			
			flagPositionArray.push({ flag: match.override.theme.themeFlags, index: match.index }); //? add the flag to the array with the position
			flagPositionArray.push({ flag: styles.reset + resetTheme.themeFlags, index: match.index + match.length }); //? add the reset flag to the array with the position

			compleatedOverrides.push(match);
		}
		
		flagPositionArray.sort((a, b) => a.index - b.index); //? sort flag positions by index
		let positionIndex = 0;
		for (let i = 0; i < flagPositionArray.length; i++) {
			const data = flagPositionArray[i];
			const index = data.index + positionIndex;
			const length = data.flag.length;

			out = out.slice(0, index) + data.flag + out.slice(index);
			positionIndex += length;
		}

		// console.log(out.split(/\x1b/g).join('').split('[0m'))
		return out;
	}
}
//#endregion

export const defaultThemeProfile = new ThemeProfile({
	// name: "default",
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
	/**
	 * @description This is where custom theme overrides are defined
	 * @param {Group} flag = [fg=red] or [bg=red] or [st=bold] or any combination of those
	 * @param {Group} fg foreground | bg = background | st = style
	 * @param {Group} bg = background | st = style
	 * @param {Group} st = style
	 * @param {Group} ftag = foreground tag | btag = background tag | stag = style tag
	 * @param {Group} target = the string that gets colored, anything else will be removed
	 * @param {Group} end = the end of the flag (always [/>])
	 * @example input: [fg=red bg=blue st=bold]Hello World[/>]
	 * @example output: \x1b[38;2;255;0;0m\x1b[48;2;0;0;255m\x1b[1mHello World\x1b[0m
	*/
	colorSyntax: [
		/(?<flag>\[(?<fg>fg=(?<ftag>.+?)\s?)?(?<bg>bg=(?<btag>.+?)\s?)?(?<st>st=(?<stag>.+?)\s?)?\])(?<target>\[\/>\]|.*?)(?<end>\[\/>\])/g,
	],
	overrides: [
		new ThemeOverride([
			/(\()(?:\)|.)*?(\))/g,
			/(\{)(?:\}|.)*?(\})/g,
			/(\[)(?:\]|.)*?(\])/g,
		], new Theme('#aaaaaa')),
		new ThemeOverride([
			' + ', ' - ', ' / ', ' * ', ' = ', ' % '
		], new Theme('#bebebe', null, 'bold')),
		new ThemeOverride([
			'.', ':', ';', ','
		], new Theme('#998440')),
		new ThemeOverride([/(?<!\\)(['"`])(?:\\\1|.)*?(\1)/g], new Theme('#C4785B')),
		new ThemeOverride(/[0-9]+/g, new Theme('#B5CEA8')),
		new ThemeOverride([/true|false/gi], new Theme('#569CD6')),
		new ThemeOverride([/override/gi], new Theme('#2d4ee2')),
		new ThemeOverride([/error/gi], new Theme('#ff0000', null, 'bold')),
		new ThemeOverride([/ERROR/g, /danger/gi], new Theme('#be0000', null, ['bold', 'blink', 'underscore'])),
		new ThemeOverride([/warn(ing)?/gi], new Theme('#ffbb00', null, 'bold')),
		new ThemeOverride([/alert/gi], new Theme('#ffbb00', null, ['bold', 'blink'])),
		// new ThemeOverride(/ red /gi, new Theme('#ff0000')),
		// new ThemeOverride(/ green /gi, new Theme('#00ff00')),
		// new ThemeOverride(/ blue /gi, new Theme('#0000ff')),
	]
} as ThemeProfile);

//#region Methods
	//#region Getters
		/** 
		 * @param {string} input The color. supports: hex (#123ABC) or named colors (red, blue, etc.)
		 * @returns {Color} The RGB value of the color
		*/
		function getColor(input: string): Color {
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

		function getColorCodePrefix(color: Color|string, fgColor: boolean = true): string {
			//? credits to new_duck - twitch viewer
			if (typeof color === 'string') color = getColor(color);
			
			var flag =  `\x1b[38;2;`
			if (!fgColor) flag = `\x1b[48;2;`
				
			return `${flag}${color.R};${color.G};${color.B}m`
		}
	//#endregion

	//#region Constructors and Parsers
		//TODO Export this or not? maybe usefull for a user?
		function removeThemeFlags(input: string): string {
			if (typeof input !== 'string') return input;
			return input.replace(anyFlagRegex, '');
		}
	//#endregion

//#endregion