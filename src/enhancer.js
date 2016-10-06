import * as actions from './action-creators';

export default ({ history, routes, slice }) => next => (reducer, initialState, enhancer) => {

    // boilerplate
    if (typeof initialState === 'function' && typeof enhancer === 'undefined') {
        enhancer = initialState;
        initialState = undefined
    }
    const newInitialState = initialState || enhancer;

    newInitialState[slice] = {...history.location, state: history.location.state || {}};

    const store = next(reducer, newInitialState, enhancer);

    history.listen(location => {

        console.info('enchancer!', location);

        !location.silent && store.dispatch(actions.locationChange(location))
    });

    return store;
}