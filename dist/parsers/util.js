'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.flattenRoutes = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _path = require('path');

var _constants = require('../constants');

var flattenRoutes = exports.flattenRoutes = function flattenRoutes(routes) {
    var parentRoutePath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var parentIdPath = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';


    var result = [];

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = routes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var route = _step.value;
            var pattern = route.pattern;


            if (pattern === undefined) continue;

            if (typeof pattern === 'string') pattern = { path: pattern };

            var _pattern = pattern;
            var path = _pattern.path;


            path = (0, _path.join)(parentRoutePath, path);

            var _route$id = route.id;
            var id = _route$id === undefined ? path.toString() : _route$id;
            var _route$data = route.data;
            var data = _route$data === undefined ? {} : _route$data;

            var idPath = [parentIdPath, id].filter(function (item) {
                return item !== '';
            }).join(_constants.ID_DELIM);

            if (Array.isArray(route.routes)) {
                result = result.concat(flattenRoutes(route.routes, path, idPath));
            }

            if (_constants.__DEV__ && console && typeof console.warn === 'function') {
                // eslint-disable-line no-console
                if (route.id === undefined) {
                    console.warn('Route ' + JSON.stringify(pattern) + ' has no id'); // eslint-disable-line no-console
                } else if (!['string', 'number'].includes(_typeof(route.id))) {
                    console.warn('Route ' + JSON.stringify(pattern) + ' has id that is not type of string or number'); // eslint-disable-line no-console
                }
            }

            var item = _extends({
                id: id,
                idPath: idPath,
                data: data
            }, {
                pattern: _extends({}, pattern, {
                    path: path
                })
            });

            result = result.concat(item);
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

    return result;
};