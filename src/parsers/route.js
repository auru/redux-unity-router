import pathToRegexp from 'path-to-regexp';
import { join as pathJoin } from 'path';
import { parse as qsParse } from 'query-string';

let matchers = [];

const flattenRoutes = (routes, parentRoutePath = '') => {

    let result = [];

    for (let route of routes) {

        if (typeof route.pattern === 'string') {
            route.pattern = { path: route.pattern }
        }

        route.pattern.path = pathJoin(parentRoutePath, route.pattern.path);

        if (Array.isArray(route.routes)) {
            result = result.concat(flattenRoutes(route.routes, route.pattern.path));
        }

        result = result.concat(route);
    }

    return result;
};

const createMatchers = routes => routes.map(route => {
    const regexp = pathToRegexp(route.pattern.path);
    const name = route.name || route.pattern.path;
    const query = Object.keys(route.pattern.query || {}).reduce( (result, item) => {
        result[item] = new RegExp(route.pattern.query[item]);
        return result;
    }, {});

    return {
        ...route,
        name,
        regexp,
        query
    }
});

const createParamsFromKeys = (match, keys) => keys.reduce((result, key, index) => {
    result[key.name] = match[index + 1];
    return result;
}, {});

const matchPathToRoute = path => {

    path = path.split('?');
    const pathname = path.shift();
    const pathQuery = qsParse(path.shift());

    for (let matcher of matchers) {
        const { regexp, query, name, pattern, data = {} } = matcher;

        if (regexp.test(pathname)) {

            let matchQuery = true;
            let queryItems = Object.keys(query);
            let queryItemsLength = queryItems.length;

            while (matchQuery && queryItemsLength) {
                const curQueryItem = queryItems[queryItemsLength - 1];
                matchQuery = query[curQueryItem].test(pathQuery[curQueryItem]);
                queryItemsLength--;
            }

            if (matchQuery) {
                let keys = [];
                const match = pathToRegexp(pattern.path, keys).exec(pathname);
                const params = createParamsFromKeys(match, keys);
                return {
                    pattern,
                    name,
                    params,
                    data
                }
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