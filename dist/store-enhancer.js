'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _actionCreators = require('./action-creators');

var actions = _interopRequireWildcard(_actionCreators);

var _immutable = require('immutable');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var createInitialState = function createInitialState(_ref) {
    var state = _ref.state;
    var slice = _ref.slice;
    var val = _ref.val;
    var immutable = _ref.immutable;

    if (immutable) {
        state = state.set(slice, (0, _immutable.fromJS)(val));
    } else {
        state[slice] = val;
    }
    return state;
};

exports.default = function (_ref2) {
    var history = _ref2.history;
    var slice = _ref2.slice;
    var locationParser = _ref2.locationParser;
    var immutable = _ref2.immutable;
    return function (next) {
        return function (reducer, initialState, enhancer) {

            // boilerplate
            if (typeof initialState === 'function' && typeof enhancer === 'undefined') {
                enhancer = initialState;
                initialState = undefined;
            }
            var newInitialState = initialState || enhancer;

            newInitialState = createInitialState({ state: newInitialState, val: locationParser(history.location), slice: slice, immutable: immutable });

            var store = next(reducer, newInitialState, enhancer);

            history.listen(function (location) {
                return !location.silent && store.dispatch(actions.locationChange(location));
            });

            return store;
        };
    };
};