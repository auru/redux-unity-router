import pathToRegexp from 'path-to-regexp';
import { join as pathJoin } from 'path';

let matchers = [];

const flattenRoutes = (routes, parentRoutePath = '') => {

    let result = [];

    for (let route of routes) {

        let routePath = typeof route.pattern === 'string' ? route.pattern : route.pattern.path;
        routePath = pathJoin(parentRoutePath, routePath);

        const routeQuery =  typeof route.pattern === 'string' ? '' : '?' + route.pattern.query;

        if (Array.isArray(route.routes)) {
            result = result.concat(flattenRoutes(route.routes, routePath));
        }

        route.pattern = routePath + routeQuery;

        result = result.concat(route);
    }

    return result;
};

const createMatchers = routes => routes.map(route => {
    const regexp = pathToRegexp(route.pattern);
    const name = route.name || route.pattern;
    return {
        ...route,
        name,
        regexp
    }
});

const createParamsFromKeys = (match, keys) => keys.reduce((result, key, index) => {
    result[key.name] = match[index + 1];
    return result;
}, {});

const matchPathToRoute = path => {
    for (let matcher of matchers) {
        const { regexp, name, pattern } = matcher;

        if (regexp.test(path)) {
            let keys = [];
            const match = pathToRegexp(pattern, keys).exec(path);
            const params = createParamsFromKeys(match, keys);
            return {
                name,
                pattern,
                params
            }
        }
    }
    return {}
};

const createRouteParser = routes => {
    matchers = createMatchers(flattenRoutes(routes));
    return matchPathToRoute;
};

export default createRouteParser;