import React from 'react';
import PropTypes from 'prop-types';
import BaseRouterComponent from './Base';
import { ID_DELIM, __DEV__} from '../constants';
import { push as actionPush } from '../actions';

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

        const routerStore = this.getStatefromStore();
        const { immutable, parseRoute } = this.router;
        const { redirect, push } = newProps || this.props;
        const current = this.current;

        if (routerStore) {
            const idPath = immutable ? routerStore.getIn([ 'route', 'idPath' ]) : routerStore.route.idPath;
            const routePath = idPath + ID_DELIM;
            const fragmentPath = current + ID_DELIM;
            const match = (routePath).indexOf(fragmentPath);
            const matchExact = routePath === fragmentPath;

            if (matchExact && redirect) {
                return this.store.dispatch(push(
                    typeof redirect === 'object' && redirect.id
                        ? parseRoute(redirect)
                        : redirect
                ));
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

Fragment.defaultProps = {
    push: actionPush
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
        ]),
        push: PropTypes.func.isRequired
    };
}

export default Fragment;
