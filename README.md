# Redux Unity Router

> Simple routing for your redux application.

The main purpose of this router is to mirror your browser history to the redux store and help you easily declare routes.

**We also provide [React bindings](#react-components)!**

# Table of Contents

  * [Installation](#installation)
  * [Usage](#usage)
  * [API](#api)
    * [createRouter](#createrouter-history-routes-immutable-slice-)
    * [actions](#actions)
    * [actionTypes](#actiontypes)
  * [React components](#react-components)
    * [`<RouterProvider>`](#routerprovider)
    * [`<Fragment>`](#fragment)
    * [`<Link>`](#link)
  * [Examples](#examples)


# Installation

Install `redux-unity-router` package from npm:

```bash
npm i --save redux-unity-router
```

# Usage

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
            data: {
               pageTitle: 'My news'
            },
            routes: [
                {
                    id: 'Item',
                    pattern: ':id'
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
You can learn more about setting up `routes` and their structure in the [API section](#api).

Then require those `routes` and set up your `store` like this:

```js
/* store.js */

import { createStore, applyMiddleware, compose, combineReducers } from 'redux';

// Previously defined routes
import routes from './routes.js';

import { createRouter, History } from 'redux-unity-router';

// Create history
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

// Put it all together
const enhancer = compose(...toEnhance);
const reducers = combineReducers({
    router: router.reducer
});

const initialState = {}

const store = createStore(reducers, initialState, enhancer);

export default store;
```

Now you've got yourself a simple routing system!

After navigating to `/news/1?edit=true#title` you can expect your store's state to contain `'router'` entry similar to:
```json
{
    "pathname": "/news",
    "search": "?edit=true",
    "hash": "#title",
    "key": "gmj9fs",
    "query": {"edit": "true"},
    "state": {},
    "path": "/news/1?edit=true",
    "route": {
        "pattern": {"path": "/news/:id"},
        "id": "Item",
        "idPath": "News:Item",
        "params": {"id": "1"},
        "data": {"pageTitle": "My news"}
    }
}
```

You can manage your layout by using [`<RouterProvider>`](#routerprovider), [`<Fragment>`](#fragment) and [`<Link>`](#link) React-components.
They should help keep your application simple and maintainable.


# API

## `createRouter({ history, routes, immutable, slice })`

```js
import { createRouter } from 'redux-unity-router'
```

Router factory, that returns an instance of the router object, containing: [middleware](http://redux.js.org/docs/advanced/Middleware.html), [enhancer](http://redux.js.org/docs/api/applyMiddleware.html) and [reducer](http://redux.js.org/docs/basics/Reducers.html).

### `history` {Object}
History object created by [abstraction](https://github.com/mjackson/history) over browser's History API.

### `routes` {Array}
An array of [routes](#route-object). If any of the routes can be matched to the same pattern, the route that has been declared first in `routes` array will take precedence.

### `immutable` {Boolean} *optional* 
**Default:** `false`

If you use [immutable](https://facebook.github.io/immutable-js/) store, set this to `true`.

### `slice` {String} *optional*
**Default:** `'router'`

Store's key, that will contain `router`'s data.

## `route` {Object}
An object containing route's definition.

### `pattern` {Object|String}
**Redux-Unity-Router** uses [path-to-regexp](https://github.com/pillarjs/path-to-regexp) for route-matching. There's also [a handy tool](http://forbeslindesay.github.io/express-route-tester/) to test your patterns.

Although you can declare patterns in the form of `string`s, that becomes problematic, when you want to match a route with query parameters, that may appear in arbitrary order. For this situation you may want to declare a pattern in a form of a plain `object`:

#### `path` {String} *optional*
Same as you'd declare a pattern in a form of a string.

#### `query` {Object} *optional*
Plain query object.

### `id` {String} *optional (but recommended)*
**Default:** equals `pattern` if `typeof pattern === 'string'` or `pattern.path` if `typeof pattern === 'object'`

Unique Id of the route. 
It is recommended that you define route's id, so you can easily navigate to it with `<Link>` component.

### `data` {Object}
Any arbitrary data you want reflected in the redux store, when the route is matched.

### `routes` {Array} *optional*
Any sub-routes a route may have. All the patterns and data of these sub-routes will be merged with their parent's . Sub-routes always take precedence over their parents in the matching process.

## Example:

```js
const routes = [
            {
                id: 'User',
                pattern: '/user/:id',
                data: {
                  pageTitle: 'User Profile'
                }
                routes: [
                    {
                        id: 'UserEdit',
                        data: {
                          pageTitle: 'Edit User Profile'
                        },
                        pattern: {
                            query: {
                                edit: 'true'
                            }
                        }
                    },
                    {
                        id: 'UserLogout',
                        data: {
                          message: 'goodbye'
                        },
                
                        pattern: {
                            path: 'logout'
                        }
                    }
                ]
            }
        ]

// This will produce 3 patterns:
// { path: '/user/:id', query: { edit: 'true' }, data: { pageTitle: 'User Profile' } }
// { path: '/user/:id/logout', data: { pageTitle: 'Edit User Profile' } }
// { path: '/user/:id', data: { pageTitle: 'User Profile', message: ''goodbye' } }
```

## actions
```js
import { actions } from 'redux-unity-router'
```
or
```js
import actions from 'redux-unity-router/actions'
```

Actually, these are action-creators (functions, that produce plain action objects). You can use them if you want to programmatically navigate to any part of your application. Most of them correspond to standard methods of browser's History API (except for `goToRoute` and `locationChange`).

### `push(payload)`
Navigate to new url/path. 

#### `payload` {String|Object}
* `payload` of type `string` will be interpreted as path or url.
* `payload` of type `object` should contain one the following properties:

##### `pathname` {String} *optional*
e.g. `'/news'`
##### `search` {String} *optional*
e.g. `'?edit=true'`
##### `hash` {String} *optional*
e.g. `'#title'`
##### `silent` {Boolean} *optional*
**Default:** `false`

This extra option allows you to change current location url without propagating changes to the Redux store.

### `replace(payload)`
Navigate to new url/path, replacing current history entry.

#### `payload` {String/Object}
Same as for `push` action.

### `go(payload)`
Go back or forward in history stack.

#### `payload` {Integer}
e.g. `-1`

### `goBack()`
Equivalent to `go(-1)`.

### `goForward()`
Equivalent to `go(1)`.

### `goToRoute(payload)`
Navigate to the predefined route.

#### `payload` {Object}

##### `id` {String}
Valid route ID.

##### `params` {Object} *optional*
If our route contains parameters, you should provide them here.

##### `query` {Object} *optional*
Plain query object.

##### `hash` {String} *optional*
Hash for the resulting url.

### Example:
If you've defined a route like this:
```js
{
    id: 'Preferences',
    pattern: '/prefs/:action'
}
```
and you want to navigate to `/prefs/edit?edit=true#title`, you should dispatch an action like this:
```js
store.dispatch(actions.goToRoute({
  id: 'Preferences', 
  params: { action: 'edit' }, 
  query: { edit: true }, 
  hash: 'title'
}));
```

### `locationChange(payload)`
You most likely will **never** use this one, as it is used by **Redux-Unity-Router** internally to produce an entirely new router state.

#### payload {Object}
Check your store for this one! 

## actionTypes
```js
import { actionTypes } from 'redux-unity-router'
```
or
```js
import actionTypes from 'redux-unity-router/actionTypes'
```

Internally **Redux-Unity-Router** dispatches actions with following action-types

*     @@REDUX_UNITY_ROUTER/**LOCATION_CHANGED**
*     @@REDUX_UNITY_ROUTER/**PUSH**
*     @@REDUX_UNITY_ROUTER/**REPLACE**
*     @@REDUX_UNITY_ROUTER/**GO**
*     @@REDUX_UNITY_ROUTER/**GO_BACK**
*     @@REDUX_UNITY_ROUTER/**GO_FORWARD**
*     @@REDUX_UNITY_ROUTER/**GO_TO_ROUTE**

Keep in mind, that if you want to handle actions with these action-types in your **reducers**, all actions except for 
@@REDUX_UNITY_ROUTER/**LOCATION_CHANGED** will be swallowed by **Redux-Unity-Router**'s middleware.

# React components

Although you can easily manage application's layout based on the router's redux store data, we do provide some handy react components for you to use:

## `<RouterProvider>`
### Props
#### `routes` {Array}
An array of routes. We advice you use the same array for both `createRouter` and `<RouterProvider>`.

#### `immutable` {Boolean}
**Default:** `false`

If you use [immutable](https://facebook.github.io/immutable-js/) store, set this to `true`.

#### `slice` {String} *optional*
**Default:** `'router'`

Store's key, that will contain `router`'s data. Use the same one you've used in `createRouter` setting up your store.

## `<Link>`
### Props
Supports all default `<a>` properties.

#### `to` {String|Object}
* `string` type will be interpreted as **path** or **url** (external urls are supported as well)
* `object` type can be interpreted 2 ways: if it has property `id`, it will be interpreted as `route` (see [actions.goToRoute](#gotoroutepayload)), otherwise it will be considered as a standard location object (see [actions.push](#pushpayload)).

### Example
```html
// Navigates to /application
<Link to="/application">Main page</Link>

// Navigates to /application/news?id=1#comment-box
<Link to={{ pathname: '/application/news', query: { id: '1' }, hash: 'comment-box' }}>News</Link>

// if route is defined like { id: 'Settings', pattern: '/user/:userId' } navigates to /user/1?edit=true#title
<Link to={{ id: 'Settings', params: { userId: '1' }, query: { edit: true }, hash: '#title' }}></Link>
```

## `<Fragment>`
Displays react components and other `<Fragment>`s based on current route.

### Props

#### `id` {String}
Route's ID that you want a `<Fragment>` displayed on.

#### `redirect` {String|Object} *optional*
Redirect to `path`, `url` or `route`, when `id` is the last in the chain of nested `<Fragment>'`s ids. 

See [`<Link>`](#link)'s `to` prop.

#### `component` {React component}  *optional*
You can pass react component to be used as a direct child of the `<Fragment>`.

### Example
```html
<Fragment id="Main">
    Main component for my application.

    <Fragment id="News">
        Component with my news list.
    </Fragment>

    <Fragment id="Gallery" component={Gallery} /> // imported <Gallery> react component

    <Fragment id="Contacts">
       <Fragment id="Map" component={Map} />  // imported <Map> react component
    </Fragment>
 
   <Fragment id="Redirect" redirect={{ id: 'Redirected' }} />
   <Fragment id="Redirected">
      You have been redirected here.
   </Fragment>

</Fragment>
```

## Examples
We provide a basic example of working React app that you can dig into. Just clone this repo and run:
```bash
npm run build-examples
```
