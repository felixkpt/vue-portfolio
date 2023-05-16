/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layouts/public'

const subscriptionsRouter = {

    path: '/subscriptions',
    component: Layout,
    redirect: '/subscriptions/vip',
    name: 'Subscriptions',
    meta: {
        title: 'Subscriptions',
        icon: 'el-icon-s-help'
    },
    children: [
        {
            path: 'vip',
            component: () => import('@/views/public/subscriptions/vip'),
            name: 'VIPSubscriptions',
            meta: { title: 'VIP Subscriptions', icon: 'list' }
        },
        {
            path: 'basic',
            component: () => import('@/views/public/subscriptions/basic'),
            name: 'Basic Subscriptions',
            meta: { title: 'Basic Subscriptions', icon: 'list' }
        }
    ]
}

export default subscriptionsRouter
