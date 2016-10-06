import queryString from 'query-string';
import createRouteParser from './route-parser';

let parseRoutes = _ => _;

const parseLocation = location => {
    const query = queryString.parse(location.search);
    const state = location.state || {};
    const path = location.pathname + location.search;
    const route = parseRoutes(path);

    return {
        ...location,
        query,
        state,
        path,
        route
    };
};

const createLocationParser = ({ routes }) => {
    parseRoutes = createRouteParser(routes);
    return parseLocation;
};

export default createLocationParser;