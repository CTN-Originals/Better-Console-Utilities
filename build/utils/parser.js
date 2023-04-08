"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.collectionToString = void 0;
/**
 * @param {Object} input Input object to be converted to string
 * @param {ICollectionToStringOptions} options Options for the conversion
 * @param {Number} options.indent Indentation level of the output
 * @param {String} options.indentString Indentation string of the output
 * @param {Boolean} options.color Whether to color the output or not
 * @param {Boolean} options.autoColor Whether to color the values automatically based on their type
 * @param {Object} options.brackets Whether to add brackets around the output and values that are collections
*/
function collectionToString(input, options) {
    if (options === void 0) { options = {}; }
    var output = [];
    for (var key in input) {
        if (input.hasOwnProperty(key)) {
            var value = input[key];
            if (typeof value === 'object') {
                output.push("".concat(key, ":"));
                output.push(collectionToString(value));
            }
            else {
                output.push("".concat(key, ": ").concat(value));
            }
        }
    }
    return output.join('\n');
}
exports.collectionToString = collectionToString;
