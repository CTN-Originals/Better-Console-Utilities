"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleInstance = void 0;
var util = __importStar(require("../utils"));
//* intercept console.log
if (typeof console !== 'undefined') {
    var log_1 = console.log.bind(console);
    console.log = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var input = Array.prototype.slice.call(args);
        // log(args)
        //TODO add better (false log) detection
        //! doesnt log valid empty messages
        if (args.length == 1 && args[0] == '')
            return;
        log_1.apply(void 0, args);
    };
}
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
        if (name === void 0) { name = ''; }
        if (enabled === void 0) { enabled = true; }
        if (suffix === void 0) { suffix = ''; }
        if (settings === void 0) { settings = { indent: 2, indentString: '-' }; }
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
        if (!this.enabled)
            return;
        // TODO: Add conditions
        var logOut = true; //TODO get condition from args
        if (logOut) {
            console.log(this._getLog.apply(this, args));
        }
    };
    ConsoleInstance.prototype._getLog = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var log = '';
        for (var i = 0; i < args.length; i++) {
            var arg = args[i];
            if (typeof arg === 'object') {
                var collectionStringOptipons = {
                    indent: this.settings.indent,
                    indentString: this.settings.indentString,
                };
                log += util.parser.collectionToString(arg, collectionStringOptipons);
            }
            else {
                log += arg;
            }
        }
        return log;
    };
    return ConsoleInstance;
}());
exports.ConsoleInstance = ConsoleInstance;
