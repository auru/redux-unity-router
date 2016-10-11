import React, { Children, Component, PropTypes } from 'react';

class Fragment extends Component {

    constructor(props, state) {

        super(props, state);

        const { store, router } = this.context;

        this.store = store;
        this.router = router;
        this.handleChange = this.handleChange.bind(this);

        store.subscribe(this.handleChange);

        this.state = {
            visible: false
        };
    }

    getChildContext() {

        let { router } = this.context;

        const { id } = this.props;
        const current = `${router.current}:${id}`;

        router = { current, ...router };

        return { router };
    }

    handleChange() {

        const state = this.store.getState();
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
        const { children, component: ChildComponent} = this.props;

        if (!visible) return null; // eslint-disable-line
        if (ChildComponent) return <ChildComponent />; // eslint-disable-line
        if (children) return Children.count(children) === 1 ? Children.only(children) : <div>{children}</div>; // eslint-disable-line
    }
}

Fragment.contextTypes = {
    router: PropTypes.object,
    store: PropTypes.object
};

Fragment.propTypes = {
    id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
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
