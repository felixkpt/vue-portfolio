/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layouts/admin'

const contactsRouter = {

    path: '/admin/contacts',
    component: Layout,
    redirect: '/admin/contacts/list',
    name: 'Contacts',
    meta: {
        title: 'Contacts',
        icon: 'el-icon-s-help'
    },
    children: [
        {
            path: 'list',
            component: () => import('@/views/admin/contacts/list'),
            name: 'ContactsList',
            meta: { title: 'Contacts List', icon: 'el-icon-office-building' }
        }
    ]
}

export default contactsRouter
