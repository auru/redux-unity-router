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
        id: 'Settings',
        pattern: '/application/settings/'
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