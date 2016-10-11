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
        pattern: {
            path: '/main/:param',
        },
        data: {}
    },
    {
        id: 'main',
        pattern: {
            path: '/main/'
        },
        data: {
            pageTitle: 'test'
        }
    },
    {
        id: 'test',
        pattern: {
            path: '/test/'
        },
        data: {}
    },
    {
        id: '/empty/',
        pattern: {
            path: '/empty/'
        },
        data: {}
    },
    {
        id: 'index',
        pattern: {
            path: '/'
        },
        data: {}
    }
];