'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _pathToRegexp = require('path-to-regexp');

var _pathToRegexp2 = _interopRequireDefault(_pathToRegexp);

var _queryString = require('query-string');

var _history = require('history');

var _util = require('./util');

var _error = require('../error');

var _error2 = _interopRequireDefault(_error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ERRORS = {
    noId: function noId(_) {
        return 'Can\'t match route with no id';
    },
    notFound: function notFound(id) {
        return 'Route with id ' + id + ' not found';
    }
};

var createMatchRouteToPath = function createMatchRouteToPath(registry) {
    return function (_ref) {
        var id = _ref.id;
        var _ref$params = _ref.params;
        var params = _ref$params === undefined ? {} : _ref$params;
        var _ref$query = _ref.query;
        var query = _ref$query === undefined ? {} : _ref$query;
        var _ref$hash = _ref.hash;
        var hash = _ref$hash === undefined ? '' : _ref$hash;

        if (id === undefined) throw new _error2.default(ERRORS.noId());

        var matcher = registry[id];

        if (matcher === undefined) throw new _error2.default(ERRORS.notFound(id));

        var pathname = void 0;

        try {
            pathname = matcher(params);
        } catch (e) {
            throw new _error2.default(e.toString());
        }

        var location = {
            search: (0, _queryString.stringify)(query),
            pathname: pathname,
            hash: hash
        };

        return (0, _history.createPath)(location);
    };
};

var createRouteToLocationParser = function createRouteToLocationParser(routes) {

    var registry = (0, _util.flattenRoutes)(routes).reduce(function (result, item) {
        if (result[item.id]) {
            return result;
        }
        result[item.id] = _pathToRegexp2.default.compile(item.pattern.path);
        return result;
    }, {});

    return createMatchRouteToPath(registry);
};

exports.default = createRouteToLocationParser;