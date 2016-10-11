import React, { Component } from 'react';
import logo from '../../logo.svg';
import './App.css';

import { Link, RouterProvider, Fragment } from '../../../../dist';

import DevTools from '../DevTools';
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

class App extends Component {
  render() {
    return (
    <RouterProvider routes={routes} slice="router" immutable>
        <div className="App">
            <DevTools supportImmutable />

            <Link to="/test">Test Page</Link>
            <Link to="/main">Main page</Link>
            <Link to="/main/user">User page</Link>

            <Fragment id="main">
                Main
                <Fragment id="user">
                    User
                </Fragment>
            </Fragment>

            <Fragment id="test">
                Test
            </Fragment>
          </div>
      </RouterProvider>
    );
  }
}

export default App;
