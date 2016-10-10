import React, { Component, PropTypes } from 'react';
import { parse } from 'url';
import * as actions from '../action-creators';

class Link extends Component {

    constructor(props) {

        super(props);

        this.handleClick = this.handleClick.bind(this);

        this.props.slice = this.context.slice;
        this.props.immutable = this.context.immutable;

        this.state = {
            isActive: false
        };

        this.checkActive();
    }

    handleClick(e) {


        const { to, go, params, onClick, target } = this.props;

        if (onClick) onClick(e);

        if (e.target) return;

        e.preventDefault();

        if (to) return this.locationChange(to);
        if (go) return this.locationGo(go, params);
    }

    componentWillReceiveProps(props) {

        this.checkActive();
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

        if (typeof to === 'string') to = parse(to);

        this.props.locationChange(to);
    }

    locationGo(go, params) {

        // TODO

        return { go, params };
    }

    render() {

        const { children, activeClass, to } = this.props;
        const classes = this.state.isActive ? activeClass : '';

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
    to: PropTypes.oneOfType({
        PropTypes.string,
        PropTypes.object
    }),
    go: PropTypes.string,
    params: PropTypes.object,
    activeClass: PropTypes.string,
    onClick: PropTypes.func,
    target: PropTypes.string
};

Link.defaultProps = {
    to: '',
    activeClass: ''
};

function mapStateToProps(state, ownProps) {

    const { immutable, slice } = ownProps;
    const path = immutable ? state.getIn([ slice, 'path' ]) : state[slice]['path'];

    return {
        path
    };
}

function mapDispatchToProps(dispatch) {

    return {
        locationChange: payload => actions.locationChange(payload)
    };
}

export default conect(mapStateToProps, mapDispatchToProps)(Link);
