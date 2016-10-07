import enhancer from './store-enhancer';
import reducer from './reducer';
import middleware from './middleware';
import { ACTION_TYPES } from './constants';
import * as actions from './action-creators';
import parser from './parsers/location';
import { createBrowserHistory } from 'history';

export const createRouter = ({
    history,
    routes,
    slice,
    immutable = false
}) => {
    const locationParser = parser(routes);

    return {
        actions,
        ACTION_TYPES,
        actionTypes: ACTION_TYPES,
        reducer: reducer({ locationParser, immutable }),
        enhancer: enhancer({ history, slice, locationParser, immutable }),
        middleware: middleware({ history })
    }
};

export const History = {
    createBrowserHistory
};
