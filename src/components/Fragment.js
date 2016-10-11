import React, { Children, Component, PropTypes } from 'react';

class Fragment extends Component {

    constructor(props, state) {

        super(props, state);

        const { store, router } = this.context;
        const { id } = this.props;

        this.store = store;
        this.router = router;
        this.current = router.current ? `${router.current}:${id}` : id;
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            visible: false
        };

        store.subscribe(this.handleChange);
    }

    getChildContext() {

        let { router } = this.context;

        return { router: { ...router, current: this.current } };
    }

    componentWillMount() {

        this.handleChange();
    }

    componentWillUnmount() {
        this.removed = true;
    }

    handleChange() {

        let { slice = 'router', immutable } = this.router;
        let current = this.current;

        const state = this.store.getState();
        const { id } = this.props;
        const routerStore = immutable ? state.get(slice) : state[slice];

        current = current ? current : id;

        if (routerStore) {
            const idPath = immutable ? routerStore.getIn([ 'route', 'idPath' ]) : routerStore.route.idPath;
            const match = (`${idPath}:`).indexOf(`${current}:`);

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
        const { children, component: ChildComponent} = this.props;

        if (!visible || this.removed) return null; // eslint-disable-line
        if (ChildComponent) return <ChildComponent />; // eslint-disable-line
        if (children) return <div>{children}</div>; // eslint-disable-line
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
        PropTypes.object,
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
