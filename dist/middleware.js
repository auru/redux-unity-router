'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _constants = require('./constants');

var _history = require('history');

exports.default = function (_ref) {
    var history = _ref.history;
    var routeParser = _ref.routeParser;
    return function (_ref2) {
        var dispatch = _ref2.dispatch;
        var getState = _ref2.getState;
        return function (next) {
            return function (action) {

                if (action.type.indexOf(_constants.ACTION_PREFIX) === 0 && action.type !== _constants.ACTION_TYPES.LOCATION_CHANGED) {

                    if (action.type === _constants.ACTION_TYPES.GO_TO_ROUTE) {
                        action.type = _constants.ACTION_TYPES.PUSH;
                        action.payload = routeParser(action.payload);
                    }

                    if ([_constants.ACTION_TYPES.PUSH, _constants.ACTION_TYPES.REPLACE].includes(action.type)) {

                        action.payload = typeof action.payload === 'string' ? (0, _history.parsePath)(action.payload) : action.payload;

                        var sameLocation = history.location.pathname === action.payload.pathname && history.location.search === action.payload.search && history.location.hash === action.payload.hash;

                        action.type = sameLocation ? _constants.ACTION_TYPES.REPLACE : action.type;
                    }

                    if (_constants.HISTORY_METHODS[action.type]) {
                        history[_constants.HISTORY_METHODS[action.type]](action.payload);
                    }

                    return;
                }

                return next(action); // eslint-disable-line consistent-return
            };
        };
    };
};
//# sourceMappingURL=middleware.js.map