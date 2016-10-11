import React, { Children, Component, PropTypes } from 'react';
import createRouteToLocationParser from '../parsers/routeToLocation';

class Provider extends Component {
    getChildContext() {

        const { immutable, slice, routes } = this.props;
        const router = {
            immutable,
            slice,
            routes,
            parseRoute: createRouteToLocationParser(routes)
        };

        return { router };
    }

    render() {
        return Children.only(this.props.children);
    }
}

Provider.defaultProps = {
    immutable: false,
    slice: 'router',
    routes: []
}

Provider.childContextTypes = {
    router: PropTypes.shape({
        slice: PropTypes.string,
        immutable: PropTypes.bool,
        routes: PropTypes.array
    }).isRequired
};

export default Provider;
