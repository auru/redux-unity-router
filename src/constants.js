export const ACTION_PREFIX = '@@REDUX_TINY_ROUTER';

export const ACTION_TYPES = {
    LOCATION_CHANGED: `${ACTION_PREFIX}/LOCATION_CHANGED`,
    PUSH: `${ACTION_PREFIX}/PUSH`,
    REPLACE: `${ACTION_PREFIX}/REPLACE`,
    GO: `${ACTION_PREFIX}/GO`,
    GO_BACK: `${ACTION_PREFIX}/GO_BACK`,
    GO_FORWARD: `${ACTION_PREFIX}/GO_FORWARD`
};

export const HISTORY_METHODS = {
    [ACTION_TYPES.PUSH]: 'push',
    [ACTION_TYPES.REPLACE]: 'replace',
    [ACTION_TYPES.GO]: 'go',
    [ACTION_TYPES.GO_BACK]: 'goBack',
    [ACTION_TYPES.GO_FORWARD]: 'goForward',
};