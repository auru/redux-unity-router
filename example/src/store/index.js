import { createStore, applyMiddleware, compose } from 'redux';
import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';

import createHistory from 'history/createBrowserHistory'
const history = createHistory();
const routes = [
    {
        id: 'main',
        pattern: '/main/',
        data: {
            pageTitle: 'test'
        },
        routes: [
            {
                id: 'user',
                pattern: '/user'
            }
        ]
    },
    {
        id: 'test',
        pattern: '/test/'
    }
];

import { createRouter, Link } from '../../../dist';
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


/////////////// DEBUG ///////////////////

import * as routerActions from '../../../dist/action-creators.js';

window.app = {
    history: history,
    dispatch: store.dispatch,
    actions: routerActions
};
