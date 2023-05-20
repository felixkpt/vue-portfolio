/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layouts/client'

const qualificationsRouter = [
    {

        path: '/qualifications',
        component: Layout,
        redirect: '/qualifications/list',
        name: 'Qualifications',
        meta: {
            title: 'Qualifications',
            icon: 'el-icon-s-help'
        },

        children: [
            {
                path: 'list',
                component: () => import('@/views/client/qualifications/list'),
                name: 'Qualifications',
                meta: { title: 'Qualifications', icon: 'el-icon-guide' }
            },
        ]
    },
    {

        path: '/qualifications/view',
        component: Layout,
        redirect: '/qualifications/list',
        name: 'Qualification',
        meta: {
            title: 'Qualification',
            icon: 'el-icon-s-help'
        },
        hidden: true,

        children: [
            {
                path: ':slug',
                component: () => import('@/views/client/qualifications/view'),
                name: 'QualificationView',
                meta: { title: 'Qualification View', noCache: true, activeMenu: '/qualifications/list' },
                hidden: true
            }
        ]
    }

]

export default qualificationsRouter
