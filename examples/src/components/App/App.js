import React, { Component } from 'react';
import './App.css';

import { Link, RouterProvider, Fragment } from '../../../../dist';
import { LINK_MATCH_PARTIAL, LINK_MATCH_EXACT } from '../../../../dist/constants';

import routes from '../../routes';

import Lorem from '../Lorem';

const Main = ({children}) => {
    return (
        <div className="main">
            <h2>Main</h2>
            {children}
        </div>
    );
};

const onClickCallback = e => {
    e.preventDefault();
    console.log('OnClick'); // eslint-disable-line no-console
};

const delayedOnClickCallback = e => {
    e.preventDefault();
    console.log('OnClickPromise'); // eslint-disable-line no-console
    return new Promise(resolve => {
        setTimeout(resolve, 2000);
    });
};

class App extends Component {

  render() {
    return (
    <RouterProvider routes={routes} slice="router" immutable>
        <div className="App container">
            <div className="app__navigation">
                <Link to="/main" activeMatch={LINK_MATCH_EXACT}>Main</Link>
                <Link to="/main/splat">Default</Link>
                <Link to="/main/another_splat" activeMatch={/^\/main\/another/}>Another default</Link>
                <Link to={{ pathname: '/main/user', query: { userId: 1, edit: false }, hash: 'title' }}>User</Link>
                <Link to="/main/user?edit=true&userId=2#title" activeMatch={LINK_MATCH_EXACT}>User 2</Link>
                <Link to="/scroll-to-hash#h2">Scroll to hash</Link>
                <Link to={{ id: 'Settings' }} activeMatch={LINK_MATCH_EXACT}>Settings</Link>
                <Link to={{ id: 'Preferences', params: { action: 'edit' }, query: { edit: true }, hash: 'title' }} activeMatch={LINK_MATCH_EXACT}>Preferences</Link>
                <Link to="/redirect" activeMatch={LINK_MATCH_PARTIAL}>Redirect</Link>
                <Link to="/on-click" activeMatch={LINK_MATCH_EXACT} onClick={onClickCallback}>onClick</Link>
                <Link to="/on-click-promise" activeMatch={LINK_MATCH_EXACT} onClick={delayedOnClickCallback}>onClick Promise</Link>
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
                <Fragment id="ScrollToHash" component={Lorem} />
                <Fragment id="Settings">
                    <h2>Settings</h2>
                </Fragment>
                <Fragment id="Preferences">
                    <h2>Preferences</h2>
                </Fragment>
                <Fragment id="OnClick">
                    <h2>OnClick</h2>
                </Fragment>
                <Fragment id="OnClickPromise">
                    <h2>OnClick Promise</h2>
                </Fragment>
                <Fragment id="Redirect" redirect={{ id: 'Redirected' }}>
                    <Fragment id="Redirected">
                        <h2>Redirected</h2>
                        You have been redirected here
                    </Fragment>
                </Fragment>
            </div>
          </div>
      </RouterProvider>
    );
  }
}

export default App;
