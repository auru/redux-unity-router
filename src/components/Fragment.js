import React, { Component, PropTypes } from 'react';
import { DEFAULT_SLICE, ID_DELIM } from '../constants';
import { push as actionPush } from '../actions';

class Fragment extends Component {

    constructor(props, state) {

        super(props, state);

        const { store, router } = this.context;
        const { id } = this.props;

        this.store = store;
        this.router = router;
        this.current = router.current ? `${router.current}${ID_DELIM}${id}` : id;
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            visible: false
        };

        this.unsubscribe = store.subscribe(this.handleChange);
    }

    isSubscribed() {
        return typeof this.unsubscribe === 'function';
    }

    getChildContext() {

        let { router } = this.context;

        return { router: { ...router, current: this.current } };
    }

    componentWillMount() {
        const { redirect, push } = this.props;
        if (redirect) {
            return this.store.dispatch(push(redirect));
        }
        return this.handleChange();
    }

    componentWillUnmount() {

        if (this.unsubscribe) {
            this.unsubscribe();
            this.unsubscribe = null;
        }
    }

    handleChange() {

        if (!this.isSubscribed) return;

        let { slice = DEFAULT_SLICE, immutable } = this.router;
        let current = this.current;

        const state = this.store.getState();
        const { id } = this.props;
        const routerStore = immutable ? state.get(slice) : state[slice];

        current = current ? current : id;

        if (routerStore) {
            const idPath = immutable ? routerStore.getIn([ 'route', 'idPath' ]) : routerStore.route.idPath;
            const match = (`${idPath}${ID_DELIM}`).indexOf(`${current}${ID_DELIM}`);

            if (match === 0 && !this.state.visible) {
                this.setState({
                    visible: true
                });
            } else if (match !== 0 && this.state.visible && !this.removed) {
                this.setState({
                    visible: false
                });
            }
        }

    }

    render() {

        const { visible } = this.state;
        const { children, redirect, component: ChildComponent} = this.props;

        if (!visible || redirect || this.removed) return null; // eslint-disable-line
        if (ChildComponent) return children ? <ChildComponent>{children}</ChildComponent> : <ChildComponent />; // eslint-disable-line
        if (children) return <div>{children}</div>; // eslint-disable-line
    }
}

Fragment.contextTypes = {
    router: PropTypes.object,
    store: PropTypes.object
};

Fragment.defaultProps = {
    push: actionPush
};

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

Fragment.childContextTypes = {
    router: PropTypes.shape({
        slice: PropTypes.string,
        immutable: PropTypes.bool,
        routes: PropTypes.array
    }).isRequired,
    store: PropTypes.object
};

export default Fragment;
