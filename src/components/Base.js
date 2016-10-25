import { Component } from 'react';
import { DEFAULT_SLICE } from '../constants';

class BaseRouterComponent extends Component {

    constructor(props, context) {
        super(props, context);

        const { store, router } = context;
        this.store = store;
        this.router = router;

        this.handleStoreChange = this.handleStoreChange.bind(this);

        this.unsubscribe = store && store.subscribe(this.handleStoreChange);
    }

    componentDidMount() {
        return this.handleStoreChange();
    }

    componentWillUnmount() {

        if (this.isSubscribed) {
            this.unsubscribe();
            delete this.unsubscribe;
        }
    }

    get isSubscribed() {

        return typeof this.unsubscribe === 'function';
    }

    handleStoreChange() { // eslint-disable-line class-methods-use-this
        throw new Error('this.handleStoreChange() should be implemented');
    }

    getStatefromStore() {
        const { slice = DEFAULT_SLICE, immutable } = this.router;
        const state = this.store.getState();
        return immutable ? state.get(slice) : state[slice];
    }
}

export default BaseRouterComponent;
