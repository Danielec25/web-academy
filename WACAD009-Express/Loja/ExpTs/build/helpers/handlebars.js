"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forEachNode = forEachNode;
function forEachNode(context, options) {
    let result = '';
    for (let i = 0; i < context.length; i++) {
        const item = context[i];
        if (item.poweredByNodejs) {
            result += options.fn(item);
        }
    }
    return result;
}
