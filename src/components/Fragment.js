import React, { Children, Component, PropTypes } from 'react';

class Fragment extends Component {

    getChildContext() {

        let { router } = this.context;

        const { id } = this.props;
        const  current = `${router.current}:${id}`;

        router = { current, ...router };

        return { router };

    }

    constructor(props, state) {

        super(props, state);

        const { store, router, current } = this.context;

        this.store = store;
        this.router = router;
        this.handleChange = this.handleChange.bind(this);

        store.subscribe(this.handleChange);

        this.state = {
            visible: false
        };
    }

    handleChange() {

        const state = this.store.getState()
        const { slice = 'router', current, immutable } = this.router;
        const routerStore = state[slice];

        if (routerStore) {
            const idPath = immutable ? routerStore.getIn([ 'router', 'idPath' ]) : routerStore.router.idPath;
            const match = (`${idPath}:`).indexOf(`${current}:`);

            if (match === 0 && !this.state.visible) {
                this.setState({
                    visible: true
                });
            } else if (this.state.visible) {
                this.setState({
                    visible: false
                });
            }
        }

    }

    render() {

        const { visible } = this.state;
        const { children, component } = this.props;

        if (!visible) return false;
        if (component) return <component />;
        if (children) return Children.count(children) === 1 ? Children.only(children) : <div>{children}</div>;
    }
}

Fragment.contextTypes = {
  router: PropTypes.object,
  store: PropTypes.object
};

Fragment.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
    ]),
    component: PropTypes.object
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
