/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layouts/client'

const aboutRouter = [
    {

        path: '/about',
        component: Layout,
        redirect: '/about/index',
        name: 'About',
        meta: {
            title: 'About',
            icon: 'el-icon-s-help'
        },

        children: [
            {
                path: 'index',
                component: () => import('@/views/client/about/index'),
                name: 'About',
                meta: { title: 'About', icon: 'el-icon-guide' }
            },
        ]
    },

]

export default aboutRouter
