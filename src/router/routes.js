export default [
    {
        path: '*',
        redirect: '/login',
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/router/views/Login')
    },
    {
        path: '/home',
        name: 'Home',
        component: () => import('@/router/views/Home'),
        meta: {
            requiresAuth: true
        },
    }
];