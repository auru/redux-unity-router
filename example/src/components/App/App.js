import React, { Component } from 'react';
import './App.css';

import { Link, RouterProvider, Fragment } from '../../../../dist';

import DevTools from '../DevTools';
const routes = [
    {
        id: 'Main',
        pattern: '/main/',
        data: {
            pageTitle: 'test'
        },
        routes: [
            {
                id: 'User',
                pattern: '/user'
            },
            {
                id: 'default',
                pattern: '*'
            }
        ]
    },
    {
        id: 'Settings',
        pattern: '/application/settings/'
    }
];

const Main = ({children}) => {
    return (
        <div className="main">
            <h2>Main</h2>
            {children}
        </div>
    );
}

class App extends Component {
  render() {
    return (
    <RouterProvider routes={routes} slice="router" immutable>
        <div className="App container">
            <DevTools supportImmutable />

            <div className="app__navigation">
                <Link to="/main">Main</Link>
                <Link to="/main/splat">Default</Link>
                <Link to="/main/another_splat">Another default</Link>
                <Link to={{ pathname: '/main/user', query: { userId: 1 } }}>User</Link>
                <Link go={{ id: 'Settings' }}>Settings</Link>

            </div>

            <div className="app__content">
                <Fragment id="Main" component={Main}>
                    <Fragment id="User">
                        User content
                    </Fragment>
                    <Fragment id="default">
                        Default
                    </Fragment>
                </Fragment>

                <Fragment id="Settings">
                    <h2>Settings</h2>
                </Fragment>
            </div>
          </div>
      </RouterProvider>
    );
  }
}

export default App;
