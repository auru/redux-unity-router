## Redux Tiny Router

Simple routing for your redux application.


#### Example

```js

import { createRouter } from 'redux-tiny-router';

const routes = {
    id: 'main',
    pattern: '/main/'
    routes: [
        {
            id: 'User',
            pattern: '/:userId/',
            routes: [
                {
                    id: 'UserProfile'
                    pattern: '/profile'
                },
                {
                    id: 'UserEdit'
                    pattern: '/edit'
                }
            ]
        }
    ]
};

const router = createRouter({ history, routes, slice: 'router', immutable: true });

```

#### Options

* history {Object}
* routes {Object}
* slice [optional] {String} default = 'router'
* immutable [optional] {Boolean} default = false
