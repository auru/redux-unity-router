import pathToRegexp from 'path-to-regexp';
import { stringify as qsStringify } from 'query-string';
import { createPath } from 'history';
import { flattenRoutes } from './util';
import RouterError from '../error';

const ERRORS = {
    NO_ID: _ => `Can't match route with no id`,
    NOT_FOUND: id => `Route with id ${id} not found`
};

const createMatchRouteToPath = registry => ({ id, params = {}, query = {}, hash = ''}) => {
    if (id === undefined) throw new RouterError(ERRORS.NO_ID());

    const matcher = registry[id];

    if (matcher === undefined) throw new RouterError(ERRORS.NOT_FOUND(id));

    let pathname;

    try {
        pathname = matcher(params)
    } catch (e) {
        throw new RouterError(e.toString());
    }

    const location = {
        search: qsStringify(query),
        pathname,
        hash
    };

    return createPath(location)
};

const createRouteToLocationParser = routes => {

    const registry = flattenRoutes(routes).reduce((result, item) => {
        if (result[item.id]) {
            return result;
        }
        result[item.id] = pathToRegexp.compile(item.pattern.path);
        return result;
    }, {});

    return createMatchRouteToPath(registry);
};

export default createRouteToLocationParser;