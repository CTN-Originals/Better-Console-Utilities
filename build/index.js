"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printMsg = function () {
    console.log("This is a message from the demo package");
};
var ConsoleInstance = /** @class */ (function () {
    /**
     * @param {String} name Name of the console instance
     * @param {Boolean} enabled Whether the console instance is enabled or not
     * @param {String} suffix Suffix to be added to the console output
     * @param {Object} settings Settings for the console instance
     * @param {Number} settings.indent Indentation level of the console instance
     * @param {String} settings.indentString Indentation string of the console instance
     * @param {Object} conditions Conditions for the console instance
    */
    function ConsoleInstance(name, enabled, suffix, settings, conditions) {
        if (enabled === void 0) { enabled = true; }
        if (suffix === void 0) { suffix = ''; }
        if (settings === void 0) { settings = { indent: 2, indentString: ' - ' }; }
        if (conditions === void 0) { conditions = {}; }
        this.name = name;
        this.enabled = enabled;
        this.suffix = suffix;
        this.settings = settings;
        this.conditions = conditions;
    }
    ConsoleInstance.prototype.log = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.enabled) {
            console.log.apply(console, __spreadArray(__spreadArray([this.name + ':'], args, false), [this.suffix], false));
        }
    };
    return ConsoleInstance;
}());
var cons = new ConsoleInstance('test');
// console.log('hello world');
// console.log('hello world2');
// console.log('x = [fg=red]' + cons.settings.indent + '[bg=white] y = ' + cons.settings.indentString);
// console.group('Object cons: ');
cons.log(JSON.parse(JSON.stringify(cons)));
// console.groupEnd();
