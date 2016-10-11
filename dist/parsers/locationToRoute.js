'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _pathToRegexp = require('path-to-regexp');

var _pathToRegexp2 = _interopRequireDefault(_pathToRegexp);

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createParamsFromKeys = function createParamsFromKeys(match, keys) {
    return keys.reduce(function (result, key, index) {
        result[key.name] = match[index + 1];
        return result;
    }, {});
};

var createMatchPathToRoute = function createMatchPathToRoute(matchers) {
    return function (path) {

        path = path.split('?');
        var pathname = path.shift();
        var pathQuery = _queryString2.default.parse(path.shift());

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = matchers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var matcher = _step.value;
                var regexp = matcher.regexp;
                var query = matcher.query;
                var id = matcher.id;
                var pattern = matcher.pattern;
                var _matcher$data = matcher.data;
                var data = _matcher$data === undefined ? {} : _matcher$data;


                if (regexp.test(pathname)) {

                    var matchQuery = true;
                    var queryItems = Object.keys(query);
                    var queryItemsLength = queryItems.length;

                    while (matchQuery && queryItemsLength) {
                        var curQueryItem = queryItems[queryItemsLength - 1];
                        matchQuery = query[curQueryItem].test(pathQuery[curQueryItem]);
                        queryItemsLength--;
                    }

                    if (matchQuery) {
                        var keys = [];
                        var match = (0, _pathToRegexp2.default)(pattern.path, keys).exec(pathname);
                        var params = createParamsFromKeys(match, keys);
                        return {
                            pattern: pattern,
                            id: id,
                            params: params,
                            data: data
                        };
                    }
                }
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        return {};
    };
};

var createMatchers = function createMatchers(routes) {
    return (0, _util.flattenRoutes)(routes).map(function (route) {
        var regexp = (0, _pathToRegexp2.default)(route.pattern.path);
        var id = route.id;
        var query = Object.keys(route.pattern.query || {}).reduce(function (result, item) {
            result[item] = new RegExp(route.pattern.query[item]);
            return result;
        }, {});

        return _extends({}, route, {
            id: id,
            regexp: regexp,
            query: query
        });
    });
};

var createLocationToRouteParser = function createLocationToRouteParser(routes) {
    var matchers = createMatchers(routes);
    return createMatchPathToRoute(matchers);
};

exports.default = createLocationToRouteParser;