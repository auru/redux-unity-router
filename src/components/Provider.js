import React, { Children, Component, PropTypes } from 'react';

class Provider extends Component {
    getChildContext() {

        const { immutable, slice, routes } = this.props;

        return { router: { immutable, slice, routes } };
    }

    render() {
        return Children.only(this.props.children);
    }
}

Provider.defaultProps = {
    immutable: false,
    slice: 'router',
    routes: {}
}

Provider.childContextTypes = {
    router: PropTypes.shape({
        slice: PropTypes.string,
        immutable: PropTypes.bool,
        routes: PropTypes.object
    }).isRequired
};

export default Provider;
