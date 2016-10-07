import { ACTION_TYPES } from './constants';
import { fromJS } from 'immutable';

export default ({ locationParser, immutable }) => (state = immutable ? fromJS({}) : {}, { type, payload }) => {

    if (type === ACTION_TYPES.LOCATION_CHANGED) {

        const result = locationParser(payload);

        return immutable ? fromJS(result) : result;
    }

    return state;
};