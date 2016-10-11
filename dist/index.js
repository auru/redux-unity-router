'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RouterProvider = exports.Link = exports.createRouter = exports.actionTypes = exports.ACTION_TYPES = exports.actions = exports.History = undefined;

var _constants = require('./constants');

Object.defineProperty(exports, 'ACTION_TYPES', {
    enumerable: true,
    get: function get() {
        return _constants.ACTION_TYPES;
    }
});
Object.defineProperty(exports, 'actionTypes', {
    enumerable: true,
    get: function get() {
        return _constants.ACTION_TYPES;
    }
});

var _router = require('./router');

Object.defineProperty(exports, 'createRouter', {
    enumerable: true,
    get: function get() {
        return _interopRequireDefault(_router).default;
    }
});

var _Link = require('./components/Link');

Object.defineProperty(exports, 'Link', {
    enumerable: true,
    get: function get() {
        return _interopRequireDefault(_Link).default;
    }
});

var _Provider = require('./components/Provider');

Object.defineProperty(exports, 'RouterProvider', {
    enumerable: true,
    get: function get() {
        return _interopRequireDefault(_Provider).default;
    }
});

var _history = require('history');

var _actionCreators = require('./action-creators');

var actionCreators = _interopRequireWildcard(_actionCreators);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var History = exports.History = {
    createBrowserHistory: _history.createBrowserHistory,
    createHashHistory: _history.createHashHistory,
    createMemoryHistory: _history.createMemoryHistory
};
var actions = exports.actions = actionCreators;