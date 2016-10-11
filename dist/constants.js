'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _HISTORY_METHODS;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ACTION_PREFIX = exports.ACTION_PREFIX = '@@REDUX_TINY_ROUTER';

var ACTION_TYPES = exports.ACTION_TYPES = {
    LOCATION_CHANGED: ACTION_PREFIX + '/LOCATION_CHANGED',
    PUSH: ACTION_PREFIX + '/PUSH',
    REPLACE: ACTION_PREFIX + '/REPLACE',
    GO: ACTION_PREFIX + '/GO',
    GO_BACK: ACTION_PREFIX + '/GO_BACK',
    GO_FORWARD: ACTION_PREFIX + '/GO_FORWARD',
    GO_TO_ROUTE: ACTION_PREFIX + '/GO_TO_ROUTE'
};

var HISTORY_METHODS = exports.HISTORY_METHODS = (_HISTORY_METHODS = {}, _defineProperty(_HISTORY_METHODS, ACTION_TYPES.PUSH, 'push'), _defineProperty(_HISTORY_METHODS, ACTION_TYPES.REPLACE, 'replace'), _defineProperty(_HISTORY_METHODS, ACTION_TYPES.GO, 'go'), _defineProperty(_HISTORY_METHODS, ACTION_TYPES.GO_BACK, 'goBack'), _defineProperty(_HISTORY_METHODS, ACTION_TYPES.GO_FORWARD, 'goForward'), _HISTORY_METHODS);

var __DEV__ = exports.__DEV__ = process.env.NODE_ENV === 'development';
var __PROD__ = exports.__PROD__ = !__DEV__;

var ID_DELIM = exports.ID_DELIM = ':';
//# sourceMappingURL=constants.js.map