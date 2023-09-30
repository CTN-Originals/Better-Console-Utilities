"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getColoredString = exports.getColorCodePrefix = exports.createTheme = exports.getColor = exports.defaultColorProfile = exports.ColorProfile = exports.Typethemes = exports.Theme = exports.styles = exports.setTransparency = exports.colors = void 0;
//? This function is used to keep intellisence working when referencing the colors object
function asColors(arg) { return arg; }
exports.colors = asColors({
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
function setTransparency(color) {
    exports.colors.transparent = { R: color.R, G: color.G, B: color.B };
}
exports.setTransparency = setTransparency;
function asStyles(arg) { return arg; }
exports.styles = asStyles({
    reset: "\x1b[0m",
    bold: "\x1b[1m",
    dim: "\x1b[2m",
    underscore: "\x1b[4m",
    blink: "\x1b[5m",
    inverse: "\x1b[7m",
    hidden: "\x1b[8m",
});
var Theme = /** @class */ (function () {
    /**
     * @param {IThemeParameters} input
     * @param {IColor} input.foreground The foreground color
     * @param {IColor} input.background The background color
     * @param {string[]} input.style The style or styles
    */
    function Theme(input) {
        if (input === void 0) { input = { foreground: 'white', background: null, style: null }; }
        this.foreground = input.foreground;
        this.background = input.background;
        this.style = [];
        if (Array.isArray(input.style)) {
            this.style = input.style;
        }
        else if (typeof input.style === "string") {
            this.style.push(input.style);
        }
        this.validate();
    }
    Theme.prototype.validate = function () {
        if (typeof this.foreground === "string") {
            this.foreground = getColor(this.foreground);
        }
        if (typeof this.background === "string") {
            this.background = getColor(this.background);
        }
        for (var i = 0; i < this.style.length; i++) {
            if (Object.keys(exports.styles).includes(this.style[i])) {
                this.style[i] = exports.styles[this.style[i]];
            }
            else if (Object.values(exports.styles).includes(this.style[i])) {
                continue;
            }
            else {
                console.warn("Invalid style input: ".concat(this.style[i]));
                this.style.splice(i, 1);
            }
        }
    };
    return Theme;
}());
exports.Theme = Theme;
var Typethemes = /** @class */ (function () {
    function Typethemes(input, fallbackTheme) {
        if (input === void 0) { input = {}; }
        if (fallbackTheme === void 0) { fallbackTheme = new Theme(); }
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5;
        this.string = {
            default: (((_a = input.string) === null || _a === void 0 ? void 0 : _a.default) instanceof Theme) ? (_b = input.string) === null || _b === void 0 ? void 0 : _b.default : fallbackTheme,
            overrides: (_d = (_c = input.string) === null || _c === void 0 ? void 0 : _c.overrides.map(function (e) {
                return {
                    target: e.target,
                    theme: (e.theme instanceof Theme) ? e.theme : fallbackTheme
                };
            })) !== null && _d !== void 0 ? _d : [],
        };
        this.number = { default: (((_e = input.number) === null || _e === void 0 ? void 0 : _e.default) instanceof Theme) ? (_f = input.number) === null || _f === void 0 ? void 0 : _f.default : fallbackTheme };
        this.boolean = { default: (((_g = input.boolean) === null || _g === void 0 ? void 0 : _g.default) instanceof Theme) ? (_h = input.boolean) === null || _h === void 0 ? void 0 : _h.default : fallbackTheme };
        this.object = {
            default: (((_j = input.object) === null || _j === void 0 ? void 0 : _j.default) instanceof Theme) ? (_k = input.object) === null || _k === void 0 ? void 0 : _k.default : fallbackTheme,
            key: (((_l = input.object) === null || _l === void 0 ? void 0 : _l.key) instanceof Theme) ? (_m = input.object) === null || _m === void 0 ? void 0 : _m.key : fallbackTheme,
            value: {
                typeOverride: (_p = (_o = input.object) === null || _o === void 0 ? void 0 : _o.value.typeOverride) !== null && _p !== void 0 ? _p : true,
                theme: (((_q = input.object) === null || _q === void 0 ? void 0 : _q.value.theme) instanceof Theme) ? (_r = input.object) === null || _r === void 0 ? void 0 : _r.value.theme : fallbackTheme
            },
            brackets: (((_s = input.object) === null || _s === void 0 ? void 0 : _s.brackets) instanceof Theme) ? (_t = input.object) === null || _t === void 0 ? void 0 : _t.brackets : fallbackTheme,
            punctuation: (((_u = input.object) === null || _u === void 0 ? void 0 : _u.punctuation) instanceof Theme) ? (_v = input.object) === null || _v === void 0 ? void 0 : _v.punctuation : fallbackTheme,
        };
        this.array = {
            default: (((_w = input.array) === null || _w === void 0 ? void 0 : _w.default) instanceof Theme) ? (_x = input.array) === null || _x === void 0 ? void 0 : _x.default : fallbackTheme,
            value: {
                typeOverride: (_z = (_y = input.array) === null || _y === void 0 ? void 0 : _y.value.typeOverride) !== null && _z !== void 0 ? _z : true,
                theme: (((_0 = input.array) === null || _0 === void 0 ? void 0 : _0.value.theme) instanceof Theme) ? (_1 = input.array) === null || _1 === void 0 ? void 0 : _1.value.theme : fallbackTheme
            },
            brackets: (((_2 = input.array) === null || _2 === void 0 ? void 0 : _2.brackets) instanceof Theme) ? (_3 = input.array) === null || _3 === void 0 ? void 0 : _3.brackets : fallbackTheme,
            punctuation: (((_4 = input.array) === null || _4 === void 0 ? void 0 : _4.punctuation) instanceof Theme) ? (_5 = input.array) === null || _5 === void 0 ? void 0 : _5.punctuation : fallbackTheme,
        };
    }
    return Typethemes;
}());
exports.Typethemes = Typethemes;
var ColorProfile = /** @class */ (function () {
    function ColorProfile(name, input) {
        this.name = name;
        this.theme = new Theme(input.theme);
        this.typeThemes = (input.typeThemes) ? new Typethemes(input.typeThemes) : new Typethemes();
    }
    return ColorProfile;
}());
exports.ColorProfile = ColorProfile;
exports.defaultColorProfile = new ColorProfile('default', {
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
                        foreground: exports.colors.blue,
                        background: exports.colors.cyan,
                        style: ['bold', 'underscore']
                    },
                }
            ]
        },
    }
});
//#region Methods
/**
 * @param {string} input The color. supports: hex (#123ABC) or named colors (red, blue, etc.)
 * @returns {IColor} The RGB value of the color
*/
function getColor(input) {
    if (input in exports.colors) {
        return exports.colors[input];
    }
    var regex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
    var result = regex.exec(input);
    if (!result) {
        console.warn("Invalid color input: ".concat(input));
        return { R: 0, G: 0, B: 0 }; //? Invalid input, return null or throw an error
    }
    var red = parseInt(result[1], 16);
    var green = parseInt(result[2], 16);
    var blue = parseInt(result[3], 16);
    return { R: red, G: green, B: blue };
}
exports.getColor = getColor;
function createTheme(foreground, background, style) {
    if (typeof foreground === "string") {
        foreground = getColor(foreground);
    }
    if (typeof background === "string") {
        background = getColor(background);
    }
    if (Array.isArray(style)) {
        for (var i = 0; i < style.length; i++) {
            if (Object.keys(exports.styles).includes(style[i])) {
                style[i] = exports.styles[style[i]];
            }
            else if (Object.values(exports.styles).includes(style[i])) {
                continue;
            }
            else {
                console.warn("Invalid style input: ".concat(style[i]));
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
exports.createTheme = createTheme;
function getColorCodePrefix(hex) {
    //? credits to new_duck - twitch viewer
    var color = getColor(hex);
    return "\u001B[38;2;".concat(color.R, ";").concat(color.G, ";").concat(color.B, "m");
}
exports.getColorCodePrefix = getColorCodePrefix;
function getColoredString(input, color) {
    return "".concat(getColorCodePrefix(color)).concat(input).concat(exports.styles.reset);
}
exports.getColoredString = getColoredString;
//#endregion
