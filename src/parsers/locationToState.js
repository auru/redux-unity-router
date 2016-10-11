import { parse as qsParse } from 'query-string';
import createLocationToRouteParser from './locationToRoute';

const parseLocation = locationToRoute => location => {
    const query = qsParse(location.search);
    const state = location.state || {};
    const path = location.pathname + location.search;
    const route = locationToRoute(path);

    return {
        ...location,
        query,
        state,
        path,
        route
    };
};

const createLocationToStateParser = routes => {
    const locationToRoute = createLocationToRouteParser(routes);
    return parseLocation(locationToRoute);
};

export default createLocationToStateParser;