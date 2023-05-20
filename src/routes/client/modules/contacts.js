/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layouts/client'

const contactsRouter = [
    {

        path: '/contacts',
        component: Layout,
        redirect: '/contacts/list',
        name: 'Contacts',
        meta: {
            title: 'Contacts',
            icon: 'el-icon-s-help'
        },

        children: [
            {
                path: 'list',
                component: () => import('@/views/client/contacts/list'),
                name: 'Contacts',
                meta: { title: 'Contacts', icon: 'el-icon-guide' }
            },
        ]
    },
    {

        path: '/contacts/view',
        component: Layout,
        redirect: '/contacts/list',
        name: 'Contact',
        meta: {
            title: 'Contact',
            icon: 'el-icon-s-help'
        },
        hidden: true,

        children: [
            {
                path: ':slug',
                component: () => import('@/views/client/contacts/view'),
                name: 'ContactView',
                meta: { title: 'Contact View', noCache: true, activeMenu: '/contacts/list' },
                hidden: true
            }
        ]
    }

]

export default contactsRouter
