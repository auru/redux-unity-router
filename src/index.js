import { createBrowserHistory, createHashHistory, createMemoryHistory } from 'history';
import * as actionCreators from './action-creators';

export const History = {
    createBrowserHistory,
    createHashHistory,
    createMemoryHistory
};
export const actions = actionCreators;
export { ACTION_TYPES } from './constants';
export { ACTION_TYPES as actionTypes } from './constants';
export { default as createRouter } from './router';
export { default as Link } from './components/Link';
export { default as RouterProvider } from './components/Provider';
