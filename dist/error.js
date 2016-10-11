'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
function RouterError(message) {
    this.name = 'RouterError';
    this.message = message || '';
}
RouterError.prototype = Error.prototype;

exports.default = RouterError;
//# sourceMappingURL=error.js.map