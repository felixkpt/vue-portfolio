/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layouts/client'

const companiesRouter = [
    {

        path: '/companies',
        component: Layout,
        redirect: '/companies/list',
        name: 'Experience',
        meta: {
            title: 'Experience',
            icon: 'el-icon-s-help'
        },

        children: [
            {
                path: 'list',
                component: () => import('@/views/client/companies/list'),
                name: 'Experience',
                meta: { title: 'Experience', icon: 'el-icon-guide' }
            },
        ]
    },
    {

        path: '/companies/view',
        component: Layout,
        redirect: '/companies/list',
        name: 'Company',
        meta: {
            title: 'Company',
            icon: 'el-icon-s-help'
        },
        hidden: true,

        children: [
            {
                path: ':slug',
                component: () => import('@/views/client/companies/view'),
                name: 'CompanyView',
                meta: { title: 'Company View', noCache: true, activeMenu: '/companies/list' },
                hidden: true
            }
        ]
    }

]

export default companiesRouter
