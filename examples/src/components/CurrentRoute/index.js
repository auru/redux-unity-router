import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './CurrentRoute.css';

const CurrentRoute = ({ path, routeId, matcher }) => (
    <div className={'current-route'}>
        <div className={'current-route__info'}>Info</div>
        <div className={'current-route__item'}>Path: {path}</div>
        <div className={'current-route__item'}>Id: {routeId}</div>
        <div className={'current-route__item'}> Matcher: {JSON.stringify(matcher)}</div>
    </div>
);

CurrentRoute.propTypes = {
    path: PropTypes.string,
    routeId: PropTypes.string,
    matcher: PropTypes.string
};

function mapStateToProps(state) {
    return {
        path: state.getIn([ 'router', 'path' ], ''),
        routeId: state.getIn([ 'router', 'route', 'idPath' ], ''),
        matcher: state.getIn([ 'router', 'route', 'pattern' ])
    };
}

export default connect(mapStateToProps)(CurrentRoute);
