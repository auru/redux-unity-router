import { createStore, applyMiddleware, compose } from 'redux';
import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';

import routes from '../routes';

import { createRouter, History } from '../../../dist';

const history = History.createBrowserHistory();

import DevTools from '../components/DevTools';

const slice = 'router';
const router = createRouter({ history, routes, slice, immutable: true });
const middleware = [router.middleware];
const toEnhance = [
    router.enhancer,
    applyMiddleware(...middleware),
    DevTools.instrument()
];
const enhancer = compose(...toEnhance);
const reducers = combineReducers({
    [slice]: router.reducer
});

const store = createStore(reducers, fromJS({}), enhancer);

export default store;
