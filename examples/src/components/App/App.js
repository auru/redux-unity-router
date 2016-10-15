import React, { Component } from 'react';
import './App.css';

import { Link, RouterProvider, Fragment } from '../../../../dist';

import routes from '../../routes';

import DevTools from '../DevTools';


const Main = ({children}) => {
    return (
        <div className="main">
            <h2>Main</h2>
            {children}
        </div>
    );
};

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
                <Link to={{ pathname: '/main/user', query: { userId: 1 }, hash: 'title' }}>User</Link>
                <Link to="/main/user?userId=2#title">User 2</Link>
                <Link to={{ id: 'Settings' }}>Settings</Link>
                <Link to="/redirect">Redirect</Link>
                <Link to="https://ya.ru" target="_blank">External</Link>
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
                <Fragment id="Redirect" redirect={{ pathname: '/redirected'}}>
                    <h2>You won't see this</h2>
                </Fragment>
                <Fragment id="Redirected">
                    <h2>Redirected</h2>
                    You've been redirected here
                </Fragment>
            </div>
          </div>
      </RouterProvider>
    );
  }
}

export default App;
