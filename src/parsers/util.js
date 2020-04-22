import { join as pathJoin } from 'path';
import { __DEV__, ID_DELIM } from '../constants';

export const flattenRoutes = (routes, parentRoutePath = '', parentIdPath = '', parentData = {}) => {
    let result = [];

    for (let route of routes) {

        let { pattern } = route;

        if (pattern === undefined) continue;

        if (typeof pattern === 'string') pattern = { path: pattern };

        let { path = '' } = pattern;

        path = pathJoin(parentRoutePath, path);

        const { id = path.toString(), data = {}} = route;
        const idPath = [parentIdPath, id].filter(item => item !== '').join(ID_DELIM);

        if (Array.isArray(route.routes)) {
            result = result.concat(flattenRoutes(route.routes, path, idPath, data));
        }

        if (__DEV__ && console && typeof console.warn === 'function') { // eslint-disable-line no-console
            if (route.id === undefined) {
                console.warn(`Route ${JSON.stringify(pattern)} has no id`); // eslint-disable-line no-console
            } else if (!['string', 'number'].includes(typeof route.id)) {
                console.warn(`Route ${JSON.stringify(pattern)} has id that is not type of string or number`); // eslint-disable-line no-console
            }
        }

        const item = {
            id,
            idPath,
            data: {
                ...parentData,
                ...data
            },
            ...{
                pattern: {
                    ...pattern,
                    path
                }
            }
        };

        result = result.concat(item);
    }

    return result;
};