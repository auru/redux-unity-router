'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _storeEnhancer = require('./store-enhancer');

var _storeEnhancer2 = _interopRequireDefault(_storeEnhancer);

var _reducer = require('./reducer');

var _reducer2 = _interopRequireDefault(_reducer);

var _middleware = require('./middleware');

var _middleware2 = _interopRequireDefault(_middleware);

var _locationToState = require('./parsers/locationToState');

var _locationToState2 = _interopRequireDefault(_locationToState);

var _routeToLocation = require('./parsers/routeToLocation');

var _routeToLocation2 = _interopRequireDefault(_routeToLocation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createRouter = function createRouter(_ref) {
    var history = _ref.history;
    var routes = _ref.routes;
    var _ref$slice = _ref.slice;
    var slice = _ref$slice === undefined ? 'router' : _ref$slice;
    var _ref$immutable = _ref.immutable;
    var immutable = _ref$immutable === undefined ? false : _ref$immutable;

    var locationParser = (0, _locationToState2.default)(routes);
    var routeParser = (0, _routeToLocation2.default)(routes);

    return {
        reducer: (0, _reducer2.default)({ locationParser: locationParser, immutable: immutable }),
        enhancer: (0, _storeEnhancer2.default)({ history: history, slice: slice, locationParser: locationParser, immutable: immutable }),
        middleware: (0, _middleware2.default)({ history: history, routeParser: routeParser })
    };
};

exports.default = createRouter;