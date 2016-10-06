import { ACTION_TYPES } from './constants';

export default ({ routes }) => (state = {}, { type, payload }) => {

    if (type === ACTION_TYPES.LOCATION_CHANGED) {

        console.log('reducer: action', { type, payload });

        const historyState = payload.state || {};

        return { ...payload, state: historyState };
    }

    return state;
};