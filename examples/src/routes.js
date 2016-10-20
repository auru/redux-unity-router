export default [
    {
        id: 'Main',
        pattern: '/main/',
        data: {
            pageTitle: 'Main page'
        },
        routes: [
            {
                id: 'User',
                pattern: '/user',
                data: {
                    pageTitle: 'User profile'
                },
                routes: [
                    {
                        id: 'UserEdit',
                        data: {
                            token: ' e287f992d8af8fa21c08'
                        },
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