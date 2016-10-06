import { ACTION_PREFIX, ACTION_TYPES, HISTORY_METHODS} from './constants';

export default ({ history }) => ({ dispatch, getState }) => next => action => {

    const { type, payload } = action;

    if (type.indexOf(ACTION_PREFIX) === 0 && type !== ACTION_TYPES.LOCATION_CHANGED) {

        if (HISTORY_METHODS[type]) {
            history[HISTORY_METHODS[type]](payload);
        }

        return;
    }

    return next(action);
}