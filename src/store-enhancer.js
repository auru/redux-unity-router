import * as actions from './action-creators';
import { fromJS } from  'immutable';

const createInitialState = ({state, slice, val, immutable}) => {
    if (immutable) {
        state = state.set(slice, fromJS(val));
    } else {
        state[slice] = val;
    }
    return state;
};

export default ({ history, slice, locationParser, immutable }) => next => (reducer, initialState, enhancer) => {

    // boilerplate
    if (typeof initialState === 'function' && typeof enhancer === 'undefined') {
        enhancer = initialState;
        initialState = undefined
    }
    let newInitialState = initialState || enhancer;

    newInitialState = createInitialState({ state: newInitialState, val: locationParser(history.location), slice, immutable });

    const store = next(reducer, newInitialState, enhancer);

    history.listen(location => (
        !location.silent && store.dispatch(actions.locationChange(location))
    ));

    return store;
}