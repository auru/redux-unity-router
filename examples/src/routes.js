export default [
    {
        id: 'Main',
        pattern: '/main/',
        data: {
            pageTitle: 'test'
        },
        routes: [
            {
                id: 'User',
                pattern: '/user',
                routes: [
                    {
                        id: 'UserEdit',
                        pattern: {
                            query: {
                                edit: true
                            }
                        }
                    }
                ]
            },
            {
                id: 'default',
                pattern: '*'
            }
        ]
    },
    {
        id: 'ScrollToHash',
        pattern: '/scroll-to-hash'
    },
    {
        id: 'Settings',
        pattern: '/application/settings/'
    },
    {
        id: 'Preferences',
        pattern: '/prefs/:action'
    },
    {
        id: 'Redirect',
        pattern: '/redirect',
        routes: [
            {
                id: 'Redirected',
                pattern: '/redirected'
            }
        ]
    }
];