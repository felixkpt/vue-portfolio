/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layouts/admin'

const companiesRouter = {

    path: '/admin/companies',
    component: Layout,
    redirect: '/admin/companies/list',
    name: 'Companies',
    meta: {
        title: 'Companies',
        icon: 'el-icon-collection-tag'
    },
    children: [
        {
            path: 'list',
            component: () => import('@/views/admin/companies/list'),
            name: 'CompaniesList',
            meta: { title: 'Companies List', icon: 'el-icon-collection-tag' }
        }
    ]
}

export default companiesRouter
