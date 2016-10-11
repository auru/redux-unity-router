'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Fragment = function (_Component) {
    _inherits(Fragment, _Component);

    function Fragment(props, state) {
        _classCallCheck(this, Fragment);

        var _this = _possibleConstructorReturn(this, (Fragment.__proto__ || Object.getPrototypeOf(Fragment)).call(this, props, state));

        var _this$context = _this.context;
        var store = _this$context.store;
        var router = _this$context.router;


        _this.store = store;
        _this.router = router;
        _this.handleChange = _this.handleChange.bind(_this);

        store.subscribe(_this.handleChange);

        _this.state = {
            visible: false
        };
        return _this;
    }

    _createClass(Fragment, [{
        key: 'getChildContext',
        value: function getChildContext() {
            var router = this.context.router;
            var id = this.props.id;

            var current = router.current + ':' + id;

            router = _extends({ current: current }, router);

            return { router: router };
        }
    }, {
        key: 'handleChange',
        value: function handleChange() {

            var state = this.store.getState();
            var _router = this.router;
            var _router$slice = _router.slice;
            var slice = _router$slice === undefined ? 'router' : _router$slice;
            var current = _router.current;
            var immutable = _router.immutable;

            var routerStore = state[slice];

            if (routerStore) {
                var idPath = immutable ? routerStore.getIn(['router', 'idPath']) : routerStore.router.idPath;
                var match = (idPath + ':').indexOf(current + ':');

                if (match === 0 && !this.state.visible) {
                    this.setState({
                        visible: true
                    });
                } else if (this.state.visible) {
                    this.setState({
                        visible: false
                    });
                }
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var visible = this.state.visible;
            var _props = this.props;
            var children = _props.children;
            var ChildComponent = _props.component;


            if (!visible) return null; // eslint-disable-line
            if (ChildComponent) return _react2.default.createElement(ChildComponent, null); // eslint-disable-line
            if (children) return _react.Children.count(children) === 1 ? _react.Children.only(children) : _react2.default.createElement(
                'div',
                null,
                children
            ); // eslint-disable-line
        }
    }]);

    return Fragment;
}(_react.Component);

Fragment.contextTypes = {
    router: _react.PropTypes.object,
    store: _react.PropTypes.object
};

Fragment.propTypes = {
    id: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
    children: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.array]),
    component: _react.PropTypes.object
};

Fragment.childContextTypes = {
    router: _react.PropTypes.shape({
        slice: _react.PropTypes.string,
        immutable: _react.PropTypes.bool,
        routes: _react.PropTypes.array
    }).isRequired,
    store: _react.PropTypes.object
};

exports.default = Fragment;