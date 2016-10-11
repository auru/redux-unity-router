import React, { Component, PropTypes } from 'react';
import { parse, format } from 'url';
import * as actions from '../action-creators';

class Link extends Component {

    constructor(props, context) {

        super(props, context);

        const { store, router } = context;

        this.handleClick = this.handleClick.bind(this);
        this.store = store;
        this.router = router;
        this.state = {
            isActive: false
        };

        const href = this.getHref();
        this.href = typeof href === 'string' ? parse(href) : href;
    }

    getHref() {

        const { to, go = {} } = this.props;

        if (to) {
            return to;
        } else if (go) {
            if (typeof go === 'string') {
                return this.router.parseRoute({ id: go });
            } else {
                return this.router.parseRoute({ ...go });
            }
        }

        return false;
    }

    handleClick(e) {

        const { onClick, target } = this.props;

        if (onClick) onClick(e);

        if (target) return;

        e.preventDefault();

        return this.locationChange(this.href);
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

    render() {

        const { children, activeClass, className } = this.props;
        const classes = this.state.isActive ? activeClass + className : className;
        let href = this.href;

        return (
            <a
                href={format(href)}
                className={classes}
                onClick={this.handleClick}
            >
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
    go: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
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
    router: PropTypes.object,
    store: PropTypes.object
};

export default Link;
