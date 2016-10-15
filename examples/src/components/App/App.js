import React, { Component } from 'react';
import './App.css';

import { Link, RouterProvider, Fragment } from '../../../../dist';
import { LINK_MATCH_PARTIAL, LINK_MATCH_EXACT } from '../../../../dist/constants';

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
                <Link to="/main" activeMatch={LINK_MATCH_EXACT}>Main</Link>
                <Link to="/main/splat">Default</Link>
                <Link to="/main/another_splat">Another default</Link>
                <Link to={{ pathname: '/main/user', query: { userId: 1, edit: false }, hash: 'title' }}>User</Link>
                <Link to="/main/user?edit=true&userId=2#title" activeMatch={LINK_MATCH_EXACT}>User 2</Link>
                <Link to={{ id: 'Settings' }} activeMatch={LINK_MATCH_EXACT}>Settings</Link>
                <Link to="/redirect" activeMatch={LINK_MATCH_PARTIAL}>Redirect</Link>
                <Link to="https://ya.ru" target="_blank">External</Link>
            </div>

            <div className="app__content">
                <Fragment id="Main" component={Main}>
                    <Fragment id="User">
                        User content
                        <Fragment id="UserEdit">
                            Edit form
                        </Fragment>
                    </Fragment>
                    <Fragment id="default">
                        Default
                    </Fragment>
                </Fragment>
                <Fragment id="Settings">
                    <h2>Settings</h2>
                </Fragment>
                <Fragment id="Redirect" redirect={{ id: 'Redirected' }}>
                    <Fragment id="Redirected">
                        <h2>Redirected</h2>
                        You've been redirected here
                    </Fragment>
                </Fragment>
            </div>
          </div>
      </RouterProvider>
    );
  }
}

export default App;
