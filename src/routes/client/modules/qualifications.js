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
            icon: 'education'
        },

        children: [
            {
                path: 'list',
                component: () => import('@/views/client/qualifications/list'),
                name: 'Qualifications',
                meta: { title: 'Qualifications', icon: 'education' }
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
            icon: 'education'
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
