/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layouts/admin'

const aboutRouter = {

    path: '/admin/about',
    component: Layout,
    redirect: '/admin/about/index',
    name: 'About',
    meta: {
        title: 'About',
        icon: 'el-icon-s-promotion'
    },
    children: [
        {
            path: 'index',
            component: () => import('@/views/admin/about/index'),
            name: 'AboutIndex',
            meta: { title: 'About', icon: 'el-icon-s-promotion' }
        }
    ]
}

export default aboutRouter
