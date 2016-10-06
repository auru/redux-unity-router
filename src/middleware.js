import { ACTION_PREFIX, ACTION_TYPES, HISTORY_METHODS} from './constants';

export default ({ history, routes }) => ({ dispatch, getState }) => next => action => {

    const { type, payload } = action;

    if (type.indexOf(ACTION_PREFIX) === 0 && type !== ACTION_TYPES.LOCATION_CHANGED) {

        if (HISTORY_METHODS[type]) {

            console.info(`Middleware: executing action ${HISTORY_METHODS[type]} with payload`, payload);

            history[HISTORY_METHODS[type]](payload);
        }
        return;
    }

    return next(action);
}