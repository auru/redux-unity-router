import enhancer from './store-enhancer';
import reducer from './reducer';
import middleware from './middleware';
import { ACTION_TYPES } from './constants';
import * as actions from './action-creators';
import parser from './location-parser';

export const createRouter = ({
    history,
    routes,
    slice
}) => {

    const locationParser = parser({ routes });

    return {
        actions,
        ACTION_TYPES,
        actionTypes: ACTION_TYPES,
        reducer: reducer({ locationParser }),
        enhancer: enhancer({ history, slice, locationParser }),
        middleware: middleware({ history })
    }
};

export default createRouter;