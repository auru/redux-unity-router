import React, { Component, PropTypes } from 'react';
import { parse, format } from 'url';
import { stringify as qsStringify } from 'query-string';
import * as actions from '../actions';
import { __DEV__ } from '../constants';

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

    shouldComponentUpdate(props, state) {

        return this.state.isActive !== state.isActive || this.props.to !== props.to;
    }

    handleClick(e) {

        const { onClick } = this.props;

        if (onClick) onClick(e);

        e.preventDefault();

        return this.locationChange(this.href);
    }

    getHref() {

        const { to } = this.props;

        switch (typeof to) {
        case 'string':
            return to;
        case 'object':
            return to.id
                    ? this.router.parseRoute(to)
                    : to;
        default:
            return false;
        }
    }

    // checkActive() {
    //
    //     const { to } = this.props;
    //     const isActive = path.indexOf(to) !== 0;
    //
    //     if (isActive !== this.state.isActive) {
    //         this.setState({
    //             isActive
    //         });
    //     }
    // }

    locationChange(to) {

        const { method } = this.props;

        let search = to.query || to.search;
        search = typeof search === 'object' ? qsStringify(search) : search;

        const payload = {
            pathname: to.pathname,
            search: search,
            hash: to.hash
        };

        this.store.dispatch(actions[method](payload));
    }

    render() {

        const { children, activeClass, className, target } = this.props;
        const classes = this.state.isActive ? activeClass + className : className;

        const props = {
            target,
            href: format(this.href),
            className: classes
        };

        if (!target && !this.href.protocol) {
            props.onClick = this.handleClick;
        }

        return React.createElement('a', props, children);
    }
}

Link.contextTypes = {
    router: PropTypes.object,
    store: PropTypes.object
};

Link.defaultProps = {
    to: '',
    activeClass: '',
    method: 'push'
};

if (__DEV__) {
    Link.propTypes = {
        to: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object
        ]),
        params: PropTypes.object,
        activeClass: PropTypes.string,
        onClick: PropTypes.func,
        target: PropTypes.string,
        className: PropTypes.string,
        method: PropTypes.string,
        children: PropTypes.oneOfType([
            PropTypes.element,
            PropTypes.arrayOf(PropTypes.element),
            PropTypes.string
        ])
    };
}

export default Link;
