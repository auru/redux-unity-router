import React from 'react';
import PropTypes from 'prop-types';
import BaseRouterComponent from './Base';
import { ID_DELIM, __DEV__} from '../constants';
import { replace } from '../actions';

class Fragment extends BaseRouterComponent {

    constructor(props, context) {

        super(props, context);

        const { id } = this.props;
        this.current = this.router.current ? this.router.current + ID_DELIM + id : id;

        this.state = {
            visible: false
        };
    }

    componentWillReceiveProps(newProps) {

        const { redirect } = this.props;
        const newRedirect = newProps.redirect;

        if ((!redirect && newRedirect) ||
            (newRedirect && redirect && newRedirect.id !== redirect.id) ||
            (typeof newRedirect === 'string' && redirect !== newRedirect)) {
            this.handleStoreChange(newProps);
        }
    }

    getChildContext() {

        const { router } = this.context;

        return { router: { ...router, current: this.current } };
    }

    handleStoreChange(newProps) {

        if (!this.isSubscribed) return;

        const { immutable, parseRoute } = this.router;
        const { redirect } = newProps || this.props;

        const current = this.current;
        const storeState = this.getStatefromStore();
        const routerStore = immutable ? storeState.toJS() : storeState;

        if (routerStore) {
            const idPath = routerStore.route.idPath;
            const params = routerStore.route.params;
            const query = routerStore.query;
            const hash = routerStore.hash;
            const routePath = idPath + ID_DELIM;
            const fragmentPath = current + ID_DELIM;
            const match = (routePath).indexOf(fragmentPath);
            const matchExact = routePath === fragmentPath;

            if (matchExact && redirect) {
                const redirectRoute = typeof redirect === 'object' && redirect.id ?
                    parseRoute({ ...{ params, query, hash }, ...redirect }) : redirect;

                return this.store.dispatch(replace(redirectRoute));
            }

            if (match === 0 && !this.state.visible) {
                return this.setState({
                    matchExact,
                    visible: true
                });
            }
            if (match !== 0 && this.state.visible) {
                return this.setState({
                    matchExact,
                    visible: false
                });
            }
        }
    }

    render() {

        const { visible, matchExact, redirect } = this.state;
        const { children, component: ChildComponent} = this.props;

        if (!visible || (matchExact && redirect)) return null; // eslint-disable-line
        if (ChildComponent) return children ? <ChildComponent>{children}</ChildComponent> : <ChildComponent />; // eslint-disable-line
        if (children) return <div>{children}</div>; // eslint-disable-line
    }
}

Fragment.contextTypes = {
    router: PropTypes.object,
    store: PropTypes.object
};

Fragment.childContextTypes = {
    router: PropTypes.shape({
        slice: PropTypes.string,
        immutable: PropTypes.bool,
        routes: PropTypes.array
    }).isRequired,
    store: PropTypes.object
};

if (__DEV__) {
    Fragment.propTypes = {
        id: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        children: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.string,
            PropTypes.array
        ]),
        component: PropTypes.func,
        redirect: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.string
        ])
    };
}

export default Fragment;
