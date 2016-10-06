import * as actions from './action-creators';

export default ({ history, slice, locationParser }) => next => (reducer, initialState, enhancer) => {

    // boilerplate
    if (typeof initialState === 'function' && typeof enhancer === 'undefined') {
        enhancer = initialState;
        initialState = undefined
    }
    const newInitialState = initialState || enhancer;

    newInitialState[slice] = locationParser(history.location);

    const store = next(reducer, newInitialState, enhancer);

    history.listen(location => (
        !location.silent && store.dispatch(actions.locationChange(location))
    ));

    return store;
}