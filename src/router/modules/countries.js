/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const countriesRouter = {
    path: '/countries',
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
            component: () => import('@/views/countries/index'), // Parent router-view
            name: 'List',
            meta: { title: 'All Countries' }
        }
    ]
}

export default countriesRouter
