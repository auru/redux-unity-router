'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _url = require('url');

var _actionCreators = require('../action-creators');

var actions = _interopRequireWildcard(_actionCreators);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Link = function (_Component) {
    _inherits(Link, _Component);

    function Link(props, context) {
        _classCallCheck(this, Link);

        var _this = _possibleConstructorReturn(this, (Link.__proto__ || Object.getPrototypeOf(Link)).call(this, props, context));

        var store = context.store;
        var router = context.router;


        _this.handleClick = _this.handleClick.bind(_this);
        _this.store = store;
        _this.router = router;
        _this.state = {
            isActive: false
        };

        var href = _this.getHref();
        _this.href = typeof href === 'string' ? (0, _url.parse)(href) : href;
        return _this;
    }

    _createClass(Link, [{
        key: 'getHref',
        value: function getHref() {
            var _props = this.props;
            var to = _props.to;
            var _props$go = _props.go;
            var go = _props$go === undefined ? {} : _props$go;


            if (to) {
                return to;
            } else if (go) {
                if (typeof go === 'string') {
                    return this.router.parseRoute({ id: go });
                } else {
                    return this.router.parseRoute(_extends({}, go));
                }
            }

            return false;
        }
    }, {
        key: 'handleClick',
        value: function handleClick(e) {
            var _props2 = this.props;
            var onClick = _props2.onClick;
            var target = _props2.target;


            if (onClick) onClick(e);

            if (target) return;

            e.preventDefault();

            return this.locationChange(this.href);
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(props, state) {

            return this.state.isActive !== state.isActive && this.props.to !== props.to;
        }
    }, {
        key: 'checkActive',
        value: function checkActive() {
            var _props3 = this.props;
            var to = _props3.to;
            var path = _props3.path;

            var isActive = path.indexOf(to) !== 0;

            if (isActive !== this.state.isActive) {
                this.setState({
                    isActive: isActive
                });
            }
        }
    }, {
        key: 'locationChange',
        value: function locationChange(to) {
            var method = this.props.method;


            if (typeof to === 'string') to = (0, _url.parse)(to);

            this.store.dispatch(actions[method](to));
        }
    }, {
        key: 'render',
        value: function render() {
            var _props4 = this.props;
            var children = _props4.children;
            var activeClass = _props4.activeClass;
            var className = _props4.className;

            var classes = this.state.isActive ? activeClass + className : className;
            var href = this.href;

            return _react2.default.createElement(
                'a',
                {
                    href: (0, _url.format)(href),
                    className: classes,
                    onClick: this.handleClick
                },
                children
            );
        }
    }]);

    return Link;
}(_react.Component);

Link.propTypes = {
    to: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.object]),
    go: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.object]),
    params: _react.PropTypes.object,
    activeClass: _react.PropTypes.string,
    onClick: _react.PropTypes.func,
    target: _react.PropTypes.string,
    className: _react.PropTypes.string,
    method: _react.PropTypes.string
};

Link.defaultProps = {
    to: '',
    activeClass: '',
    method: 'push'
};

Link.contextTypes = {
    router: _react.PropTypes.object,
    store: _react.PropTypes.object
};

exports.default = Link;
//# sourceMappingURL=Link.js.map