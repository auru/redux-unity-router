import pathToRegexp from 'path-to-regexp';
import qs from 'query-string';
import { flattenRoutes } from './util';

const createParamsFromKeys = (match, keys) => keys.reduce((result, key, index) => {
    result[key.name] = match[index + 1];
    return result;
}, {});

const createMatchPathToRoute = matchers => path => {
    path = path.split('?');
    const pathname = path.shift();
    const pathQuery = qs.parse(path.shift());

    for (let matcher of matchers) {
        const { regexp, query, id, idPath, pattern, data = {} } = matcher;

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
                    id,
                    idPath,
                    params,
                    data
                };
            }
        }
    }
    return {};
};

const createMatchers = routes => flattenRoutes(routes).map(route => {
    const regexp = pathToRegexp(route.pattern.path);
    const id = route.id;
    const query = Object.keys(route.pattern.query || {}).reduce( (result, item) => {
        result[item] = new RegExp(route.pattern.query[item]);
        return result;
    }, {});

    return {
        ...route,
        id,
        regexp,
        query
    };
});

const createLocationToRouteParser = routes => {
    const matchers = createMatchers(routes);
    return createMatchPathToRoute(matchers);
};

export default createLocationToRouteParser;