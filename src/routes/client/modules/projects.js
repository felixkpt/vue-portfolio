/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layouts/client'

const projectsRouter = [
    {

        path: '/projects',
        component: Layout,
        redirect: '/projects/list',
        name: 'Projects',
        meta: {
            title: 'Projects',
            icon: 'el-icon-s-help'
        },

        children: [
            {
                path: 'list',
                component: () => import('@/views/client/projects/list'),
                name: 'Projects',
                meta: { title: 'Projects', icon: 'el-icon-s-help' }
            },
        ]
    },
    {

        path: '/projects/view',
        component: Layout,
        redirect: '/projects/list',
        name: 'Project',
        meta: {
            title: 'Project',
            icon: 'el-icon-s-help'
        },
        hidden: true,

        children: [
            {
                path: ':slug',
                component: () => import('@/views/client/projects/view'),
                name: 'ViewProject',
                meta: { title: 'View Project', noCache: true, activeMenu: '/projects/list' },
                hidden: true
            }
        ]
    }

]

export default projectsRouter
