import enhancer from './enhancer';
import reducer from './reducer';
import middleware from './middleware';
import { ACTION_TYPES } from './constants';
import * as actions from './action-creators';

const router = {
    actionTypes: ACTION_TYPES,
    ACTION_TYPES,
    actions,
    reducer,
    enhancer,
    middleware
};

export const createRouter = ({
    history,
    routes,
    slice
}) => ({
    ...router,
    reducer: reducer({ routes }),
    enhancer: enhancer({ history, routes, slice }),
    middleware: middleware({ history, routes })
});

export default router;