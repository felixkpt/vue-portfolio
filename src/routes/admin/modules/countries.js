/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layouts/admin'

const countriesRouter = {
    path: '/admin/countries',
    component: Layout,
    redirect: '/countries',
    name: 'Countries',
    meta: {
        title: 'Countries',
        icon: 'countries'
    },
    children: [
        {
            path: 'list',
            component: () => import('@/views/admin/countries/index'), // Parent router-view
            name: 'List',
            meta: { title: 'All Countries' }
        }
    ]
}

export default countriesRouter
