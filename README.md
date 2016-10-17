## Redux Tiny Router

Simple routing for your redux application.

### Installation

Installing package from npm:

```bash
$ npm i redux-tiny-router
```

Before go to next step, we suggest you make a file with your routes:

```js
//routes.js
export default {
    id: 'Main',
    pattern: '/application/',
    data: {
        pageTitle: 'My simple application'
    },
    routes: [
        {
            id: 'News',
            pattern: '/news/'
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

Then require routes list, router and create router and history instance, like that:

```js
//store.js
import routes from 'routes.js';
import { createRouter, History } from 'redux-tiny-router';

const history = History.createBrowserHistory();
const router = createRouter({ history, routes });
```

Enhance your store by using router object

```js
//store.js
const middleware = [ router.middleware ];
const toEnhance = [
    router.enhancer,
    applyMiddleware(...middleware)
];
const enhancer = compose(...toEnhance);
const reducer = combineReducers({
    router: router.reducer
});

createStore(reducers, {}, enhancer);
```

You've got a simple routing without complicated settings.
You can manage your system by using <RouterProvider />, <Fragment /> and <Link /> components.
It should helps you doing your application so simple and understandable.


## API

#### `createRouter({ history, routes, immutable, slice })`
Entry point for your routing. Returns [middleware](http://redux.js.org/docs/advanced/Middleware.html), [enhancer](http://redux.js.org/docs/api/applyMiddleware.html) and [reducer](http://redux.js.org/docs/basics/Reducers.html).

##### `history` {Object}
History object by browser history api.

##### `routes` {Object}
Plain object with your routes.

##### `immutable` {Boolean}
By default `false`. If you use immutable-like store set it in `true`.

##### `slice` {String}
By default `router`. It's a part which router will be contains data.


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
support any default `<a>` property

##### `to` {Object|String}

####Example
```js
<Link to="/application">Main page</Link>
<Link to={{ pathname: '/application/news', query: { id: 'news-id' }, hash: 'comment-box' }}>Main page</Link>
<Link to={{ id: 'Settings' }}></Link>
```
