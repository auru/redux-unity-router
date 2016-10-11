'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _queryString = require('query-string');

var _locationToRoute = require('./locationToRoute');

var _locationToRoute2 = _interopRequireDefault(_locationToRoute);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var parseLocation = function parseLocation(locationToRoute) {
    return function (location) {
        var query = (0, _queryString.parse)(location.search);
        var state = location.state || {};
        var path = location.pathname + location.search;
        var route = locationToRoute(path);

        return _extends({}, location, {
            query: query,
            state: state,
            path: path,
            route: route
        });
    };
};

var createLocationToStateParser = function createLocationToStateParser(routes) {
    var locationToRoute = (0, _locationToRoute2.default)(routes);
    return parseLocation(locationToRoute);
};

exports.default = createLocationToStateParser;