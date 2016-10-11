import { ID_DELIM } from '../../src/constants';

export const initialRoutes = [
    {
        id: 'index',
        pattern: '/',
        routes: [
            {
                id: 'main',
                pattern: '/main/',
                data: {
                    pageTitle: 'test'
                },
                routes: [
                    {
                        id: 'main+param+query',
                        pattern: {
                            path: '/:param',
                            query: {
                                test: 'true'
                            }
                        }
                    },
                    {
                        id: 'main+param',
                        pattern: '/:param'
                    }
                ]
            },
            {
                id: 'test',
                pattern: '/test/'
            },
            {
                pattern: '/empty/'
            },
            {
                id: 'pattern undefined'
            },
            {

            }
        ]
    }
];

export const expectedRoutes = [
    {
        id: 'main+param+query',
        idPath: ['index', 'main', 'main+param+query'].join(ID_DELIM),
        pattern: {
            path: '/main/:param',
            query: {
                test: 'true'
            }
        },
        data: {}
    },
    {
        id: 'main+param',
        idPath: ['index', 'main', 'main+param'].join(ID_DELIM),
        pattern: {
            path: '/main/:param',
        },
        data: {}
    },
    {
        id: 'main',
        idPath: ['index', 'main'].join(ID_DELIM),
        pattern: {
            path: '/main/'
        },
        data: {
            pageTitle: 'test'
        }
    },
    {
        id: 'test',
        idPath: ['index', 'test'].join(ID_DELIM),
        pattern: {
            path: '/test/'
        },
        data: {}
    },
    {
        id: '/empty/',
        idPath: ['index', '/empty/'].join(ID_DELIM),
        pattern: {
            path: '/empty/'
        },
        data: {}
    },
    {
        id: 'index',
        idPath: 'index',
        pattern: {
            path: '/'
        },
        data: {}
    }
];