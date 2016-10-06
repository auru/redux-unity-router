import { ACTION_TYPES } from './constants';

export default ({ locationParser }) => (state = {}, { type, payload }) => {

    if (type === ACTION_TYPES.LOCATION_CHANGED) {

        console.log('reducer: action', { type, payload });

        return locationParser(payload);
    }

    return state;
};