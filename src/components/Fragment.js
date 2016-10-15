import React, { Component, PropTypes } from 'react';
import { DEFAULT_SLICE, ID_DELIM, __DEV__} from '../constants';
import { push as actionPush } from '../actions';

class Fragment extends Component {

    constructor(props, state) {

        super(props, state);

        const { store, router } = this.context;
        const { id } = this.props;

        this.store = store;
        this.router = router;
        this.current = router.current ? router.current + ID_DELIM + id : id;
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            visible: false
        };

        this.unsubscribe = store.subscribe(this.handleChange);
    }

    getChildContext() {

        const { router } = this.context;

        return { router: { ...router, current: this.current } };
    }

    componentWillMount() {

        return this.handleChange();
    }

    componentWillUnmount() {

        if (this.isSubscribed) {
            this.unsubscribe();
            this.unsubscribe = null;
        }
    }

    get isSubscribed() {

        return typeof this.unsubscribe === 'function';
    }

    handleChange() {

        if (!this.isSubscribed) return;

        const { slice = DEFAULT_SLICE, immutable, parseRoute} = this.router;
        const state = this.store.getState();
        const routerStore = immutable ? state.get(slice) : state[slice];
        const { redirect, push } = this.props;
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
