import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { parse, format } from 'url';
import * as actions from '../action-creators';

class Link extends Component {

    constructor(props, context) {

        super(props, context);

        const { store, router } = context;

        this.handleClick = this.handleClick.bind(this);
        this.store = store;
        this.state = {
            isActive: false
        };
    }

    handleClick(e) {

        const { to, go, params, onClick, target } = this.props;

        if (onClick) onClick(e);

        if (target) return;

        e.preventDefault();

        if (to) return this.locationChange(to);
        if (go) return this.locationGo(go, params);
    }

    shouldComponentUpdate(props, state) {

        return this.state.isActive !== state.isActive && this.props.to !== props.to;
    }

    checkActive() {

        const { to, path } = this.props;
        const isActive = path.indexOf(to) !== 0;

        if (isActive !== this.state.isActive) {
            this.setState({
                isActive
            });
        }
    }

    locationChange(to) {

        const { method } = this.props;

        if (typeof to === 'string') to = parse(to);

        this.store.dispatch(actions[method](to));
    }

    locationGo(go, params) {

        this.store.dispatch(actions.goTo(to));

        return { go, params };
    }

    render() {

        const { children, activeClass, className } = this.props;
        const classes = this.state.isActive ? activeClass + className : className;
        let { to } = this.props;

        if (typeof to === 'object') to = format(to);

        return (
            <a
            href={to}
            className={classes}
            onClick={this.handleClick}>
                {children}
            </a>
        );
    }
}

Link.propTypes = {
    to: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
    go: PropTypes.string,
    params: PropTypes.object,
    activeClass: PropTypes.string,
    onClick: PropTypes.func,
    target: PropTypes.string,
    className: PropTypes.string,
    method: PropTypes.string
};

Link.defaultProps = {
    to: '',
    activeClass: '',
    method: 'push'
};

Link.contextTypes = {
  routes: React.PropTypes.object,
  store: React.PropTypes.object
};

export default Link;
