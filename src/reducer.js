import { ACTION_TYPES } from './constants';
import parseLocation from './location-parser';

export default ({ routes }) => (state = {}, { type, payload }) => {

    if (type === ACTION_TYPES.LOCATION_CHANGED) {

        console.log('reducer: action', { type, payload });

        return parseLocation(payload);
    }

    return state;
};