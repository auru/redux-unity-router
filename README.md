## Redux Tiny Router

Simple routing for your redux application.


#### Example

```js

import { createRouter } from 'redux-tiny-router';

const routes = {
    name: 'main',
    pattern: '/main/'
    routes: [
        {
            name: 'tree',
            pattern: '/:test/',
            routes: [
                {
                    name: 'main'
                },
                {
                    name: 'MainTestHello'
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
