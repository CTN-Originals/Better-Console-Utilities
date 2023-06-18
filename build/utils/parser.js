"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.collectionToString = void 0;
var DefaultCollectionToStringOptions = {
    indent: 2,
    indentString: ' ',
    currentIndent: 0,
    brackets: true,
    color: true,
    autoColor: true, //TODO
};
var MessageObject = /** @class */ (function () {
    /**
     * @param {MessageObject} obj
    */
    function MessageObject(obj) {
        if (obj === void 0) { obj = {}; }
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        this.Type = (_a = obj.Type) !== null && _a !== void 0 ? _a : 'string';
        this.Content = [];
        this.Parent = (_b = obj.Parent) !== null && _b !== void 0 ? _b : null;
        this.Holder = (_c = obj.Holder) !== null && _c !== void 0 ? _c : null;
        this.Depth = (_d = obj.Depth) !== null && _d !== void 0 ? _d : 0;
        this.IndentCount = (_e = obj.IndentCount) !== null && _e !== void 0 ? _e : 2;
        this.IndentString = (_f = obj.IndentString) !== null && _f !== void 0 ? _f : ' ';
        this.Color = (_g = obj.Color) !== null && _g !== void 0 ? _g : '';
        this.BackgroundColor = (_h = obj.BackgroundColor) !== null && _h !== void 0 ? _h : '';
        this.Style = (_j = obj.Style) !== null && _j !== void 0 ? _j : '';
    }
    Object.defineProperty(MessageObject.prototype, "ToString", {
        get: function () {
            var _this = this;
            var _a, _b, _c;
            var out = [];
            var addLine = function (input, isLastItem, depth) {
                if (isLastItem === void 0) { isLastItem = false; }
                if (depth === void 0) { depth = _this.Depth; }
                if (depth < 0) {
                    depth = 0;
                }
                var line = "".concat(getIndent(depth)).concat(input);
                if (!isLastItem) {
                    line += ', ';
                }
                out.push("".concat(line));
            };
            var getIndent = function (depth) {
                if (depth === void 0) { depth = _this.Depth; }
                return _this.IndentString.repeat(_this.IndentCount * depth);
            };
            for (var i = 0; i < this.Content.length; i++) {
                var contentObj = this.Content[i];
                var isLastItem = (i === this.Content.length - 1);
                if (contentObj.IsCollection) {
                    var msgObj = contentObj.Value;
                    var holder = msgObj.Holder;
                    var brackets = (_a = msgObj.Holder) === null || _a === void 0 ? void 0 : _a.Brackets;
                    if (holder && brackets) {
                        addLine("".concat(msgObj.ToString), isLastItem, 0); //? depth=0 because indent is already applied to the content
                    }
                    else {
                        addLine("".concat(msgObj.ToString), isLastItem);
                    }
                }
                else {
                    if (((_b = this.Holder) === null || _b === void 0 ? void 0 : _b.Type) === 'array') {
                        addLine("".concat(contentObj.Value), isLastItem);
                    }
                    else {
                        addLine("".concat(contentObj.Key, ": ").concat(contentObj.Value), isLastItem);
                    }
                }
            }
            // console.log(this.Holder)
            if (this.Holder && this.Holder.IsCollection) {
                var head = "".concat(getIndent(this.Depth - 1));
                if (this.Holder.Key !== 'BASE') {
                    //? If the key is not a number and is a MessageObject that is not an array, add the key
                    if (this.Holder.Key.match(/[0-9]+/g) !== null && ((_c = this.Holder.Value.Holder) === null || _c === void 0 ? void 0 : _c.Type) !== 'array') {
                        //? do nothing? 
                        //TODO Reverse this to exclude this if statement
                    }
                    else {
                        head += "".concat(this.Holder.Key, ": ");
                    }
                }
                var brackets = this.Holder.Brackets;
                if (brackets) {
                    if (this.Content.length > 0) {
                        head += "".concat(brackets[0]);
                        out.unshift(head);
                        out.push("".concat(getIndent(this.Depth - 1)).concat(brackets[1]));
                    }
                    else {
                        out.unshift("".concat(head).concat(brackets[0]).concat(brackets[1]));
                    }
                }
                else {
                    out.unshift(head);
                }
            }
            return out.join("\n");
        },
        enumerable: false,
        configurable: true
    });
    return MessageObject;
}());
var MessageContent = /** @class */ (function () {
    function MessageContent(obj) {
        if (obj === void 0) { obj = {}; }
        var _a, _b, _c;
        this.Type = (_a = obj.Type) !== null && _a !== void 0 ? _a : 'string';
        this.Key = (_b = obj.Key) !== null && _b !== void 0 ? _b : '';
        this.Value = (_c = obj.Value) !== null && _c !== void 0 ? _c : '';
        this.IsCollection = ['object', 'array'].includes(this.Type);
        this._breackets = (this.IsCollection) ? (this.Type === 'object') ? ['{', '}'] : ['[', ']'] : null;
    }
    Object.defineProperty(MessageContent.prototype, "Brackets", {
        get: function () { return this._breackets; },
        enumerable: false,
        configurable: true
    });
    return MessageContent;
}());
/**
 * @param {Object} input Input object to be converted to string
 * @param {ICollectionToStringOptions} options Options for the conversion
 * @param {Number} options.indent Indentation level of the output
 * @param {String} options.indentString Indentation string of the output
 * @param {Number} options.currentIndent Current indentation level of the output
 * @param {Boolean} options.color Whether to color the output or not
 * @param {Boolean} options.autoColor Whether to color the values automatically based on their type
 * @param {Object} options.brackets Whether to add brackets around the output and values that are collections
*/
function collectionToString(input, options) {
    if (options === void 0) { options = {}; }
    var mergedOptions = __assign(__assign({}, DefaultCollectionToStringOptions), options);
    //? Type assertion to assert that mergedOptions is no longer partial
    //? and all its properties are defined
    var safeOptions = mergedOptions;
    var holder = new MessageContent({
        Type: typeOfValue(input),
        Key: 'BASE',
        IsCollection: ['object', 'array'].includes(input)
    });
    var msgObject = collectionToMessageObject(input, safeOptions, null, holder);
    holder.Value = msgObject;
    return msgObject.ToString;
}
exports.collectionToString = collectionToString;
function collectionToMessageObject(collection, options, parent, holder) {
    if (parent === void 0) { parent = null; }
    if (holder === void 0) { holder = null; }
    var msgObject = new MessageObject({
        Type: typeOfValue(collection),
        Parent: parent,
        Holder: holder !== null && holder !== void 0 ? holder : null,
        Depth: (parent) ? parent.Depth + 1 : 1,
        IndentCount: options.indent,
        IndentString: options.indentString,
    });
    for (var key in collection) {
        var value = collection[key];
        var type = typeOfValue(value);
        if (['object', 'array'].includes(type)) {
            var valueContent = collectionToMessageObject(value, options, msgObject, value);
            var content = new MessageContent({ Type: type, Key: key, Value: valueContent });
            valueContent.Holder = content;
            msgObject.Content.push(content);
        }
        else {
            msgObject.Content.push(new MessageContent({ Type: type, Key: key, Value: value }));
        }
    }
    return msgObject;
}
//? Returns the type of the value as a string and also returns 'array' for arrays
function typeOfValue(value) {
    if (typeof value == 'object') {
        if (value instanceof MessageObject) {
            return 'MessageObject';
        }
        else if (value instanceof MessageContent) {
            return 'MessageContent';
        }
        else if (Array.isArray(value)) {
            return 'array';
        }
        return 'object';
    }
    else {
        return typeof value;
    }
}
