'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _routeToLocation = require('../parsers/routeToLocation');

var _routeToLocation2 = _interopRequireDefault(_routeToLocation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Provider = function (_Component) {
    _inherits(Provider, _Component);

    function Provider() {
        _classCallCheck(this, Provider);

        return _possibleConstructorReturn(this, (Provider.__proto__ || Object.getPrototypeOf(Provider)).apply(this, arguments));
    }

    _createClass(Provider, [{
        key: 'getChildContext',
        value: function getChildContext() {
            var _props = this.props;
            var immutable = _props.immutable;
            var slice = _props.slice;
            var routes = _props.routes;

            var router = {
                immutable: immutable,
                slice: slice,
                routes: routes,
                parseRoute: (0, _routeToLocation2.default)(routes)
            };

            return { router: router };
        }
    }, {
        key: 'render',
        value: function render() {
            return _react.Children.only(this.props.children);
        }
    }]);

    return Provider;
}(_react.Component);

Provider.defaultProps = {
    immutable: false,
    slice: 'router',
    routes: []
};

Provider.childContextTypes = {
    router: _react.PropTypes.shape({
        slice: _react.PropTypes.string,
        immutable: _react.PropTypes.bool,
        routes: _react.PropTypes.array
    }).isRequired
};

exports.default = Provider;