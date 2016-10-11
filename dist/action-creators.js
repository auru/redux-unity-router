'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.goToRoute = exports.goForward = exports.goBack = exports.go = exports.replace = exports.push = exports.locationChange = undefined;

var _constants = require('./constants');

var locationChange = exports.locationChange = function locationChange(payload) {
    return {
        type: _constants.ACTION_TYPES.LOCATION_CHANGED,
        payload: payload
    };
};

var push = exports.push = function push(payload) {
    return {
        type: _constants.ACTION_TYPES.PUSH,
        payload: payload
    };
};

var replace = exports.replace = function replace(payload) {
    return {
        type: _constants.ACTION_TYPES.REPLACE,
        payload: payload
    };
};

var go = exports.go = function go(payload) {
    return {
        type: _constants.ACTION_TYPES.GO,
        payload: payload
    };
};

var goBack = exports.goBack = function goBack(payload) {
    return {
        type: _constants.ACTION_TYPES.GO_BACK,
        payload: payload
    };
};

var goForward = exports.goForward = function goForward(payload) {
    return {
        type: _constants.ACTION_TYPES.GO_FORWARD,
        payload: payload
    };
};

var goToRoute = exports.goToRoute = function goToRoute(payload) {
    return {
        type: _constants.ACTION_TYPES.GO_TO_ROUTE,
        payload: payload
    };
};