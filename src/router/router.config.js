/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
    {
        path: '/',
        component: () => import('@/views/layouts/index'),
        redirect: '/home',
        meta: {
            title: '首页',
            keepAlive: false
        },
        children: [
            {
                path: '/home',
                name: 'Home',
                component: () => import('@/views/Home'),
                meta: { title: '首页', keepAlive: false }
            },
            {
                path: '/about',
                name: 'About',
                component: () => import('@/views/About'),
                meta: { title: '关于我', keepAlive: false }
            }
        ]
    }
];
