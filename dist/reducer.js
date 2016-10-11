'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _constants = require('./constants');

var _immutable = require('immutable');

exports.default = function (_ref) {
    var locationParser = _ref.locationParser;
    var immutable = _ref.immutable;
    return function () {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : immutable ? (0, _immutable.fromJS)({}) : {};
        var _ref2 = arguments[1];
        var type = _ref2.type;
        var payload = _ref2.payload;


        if (type === _constants.ACTION_TYPES.LOCATION_CHANGED) {

            var result = locationParser(payload);

            return immutable ? (0, _immutable.fromJS)(result) : result;
        }

        return state;
    };
};