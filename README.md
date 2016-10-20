# Redux Unity Router

> Simple routing for your redux application.

The main purpose of this router is to mirror your browser history to the redux store, 
while providing means to easily declare your routes.

We also provide React bindings!

[TOC]

## Installation

Install `redux-unity-router` package from npm:

```bash
npm i --save redux-unity-router
```

## Usage

Before proceeding to the next step, we suggest you create a file containing your routes:

```js
/* routes.js */

export default {
    id: 'Main',
    pattern: '/application/',
    data: {
        pageTitle: 'My simple application'
    },
    routes: [
        {
            id: 'News',
            pattern: '/news/',
            routes: [
                {
                    id: 'Item',
                    pattern: '/:id'
                }
            ]
        },
        {
            id: 'Contacts',
            pattern: '/contacts/'
        }
    ]
};
```

Then require those routes and set up your store like this:

```js
/* store.js */

import { createStore, applyMiddleware, compose, combineReducers } from 'redux';

import routes from './routes.js';
import { createRouter, History } from 'redux-unity-router';

// Create History
const history = History.createBrowserHistory();

// Create router instance
const router = createRouter({ history, routes });

// Add router middleware to your list of middlewares
const middleware = [ router.middleware ];

// Enhance your store by using router's enhancer
const toEnhance = [
    router.enhancer,
    applyMiddleware(...middleware)
];
const enhancer = compose(...toEnhance);
const reducers = combineReducers({
    router: router.reducer
});

const store = createStore(reducers, {}, enhancer);
export default store;
```

Now you've got yourself a simple routing system!

You can manage your application by using `<RouterProvider />`, `<Fragment />` and `<Link />` React-components.
It should help you keep your application simple and maintainable.


## API

#### `createRouter({ history, routes, immutable, slice })`
Entry point for your routing. Returns [middleware](http://redux.js.org/docs/advanced/Middleware.html), [enhancer](http://redux.js.org/docs/api/applyMiddleware.html) and [reducer](http://redux.js.org/docs/basics/Reducers.html).

##### `history` {Object}
[Abstraction](https://github.com/mjackson/history) over browser's History api .

##### `routes` {Object}
Plain object with your routes.

##### `immutable` {Boolean}
By default `false`. If you use immutable-like store set it in `true`.

##### `slice` {String}
By default `router`. It's a part which router will be contains data.



# React bindings

## Components

### `<RouterProvider />`
#### Props
##### `routes` {Object}
Object with your routes. We advice use one object for `createRouter` and `RouterProvider`.

##### `immutable` {Boolean}
Set `true` if you use immutable-like store.

##### `slice` {String}
If you changed set `slice` in `createRouter` set the same value in that property.

#### `<Fragment />`
#### Props
##### `id` {String}
Id yours route from routes. On nesting Fragment ID's joining.

####Example
```js
<Fragment id="Main">
    Main component for my application.

    <Fragment id="News">
        Component with my news list.
    </Fragment>

    <Fragment id="Contacts">
        Component with my contacts.
    </Fragment>

</Fragment>
```

##### `redirect` {Object}
Redirecting options.

####Example
```js
<Fragment id="Redirect" redirect={{ id: 'Redirected' }}>
    <Fragment id="Redirected">
        You have been redirected here.
    </Fragment>
</Fragment>
```

#### `<Link />`
#### Props
Supports any default `<a>` properties

##### `to` {Object|String}

####Example
```js
<Link to="/application">Main page</Link>
<Link to={{ pathname: '/application/news', query: { id: 'news-id' }, hash: 'comment-box' }}>Main page</Link>
<Link to={{ id: 'Settings' }}></Link>
```
