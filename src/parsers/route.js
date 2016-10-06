import pathToRegexp from 'path-to-regexp';

let matchers = [];

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
    matchers = createMatchers(routes);
    return matchPathToRoute;
};

export default createRouteParser;