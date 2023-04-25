/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const settingsRouter = {
    path: '/dashboard/settings',
    name: 'Settings',
    component: Layout,
    redirect: '/settings/permissiongroups/page',
    meta: {
        title: 'Settings',
        icon: 'el-icon-set-up'
    },
    children: [

        {
            path: 'permissiongroups',
            name: 'Permission Groups',
            redirect: '/settings/permissiongroups/page',
            component: () => import('@/views/settings/permissiongroups/index'), // Parent router-view
            meta: { title: 'Permission Groups', icon: 'el-icon-s-flag' },
            children: [
                {
                    path: 'list',
                    name: 'RolePermission',
                    component: () => import('@/views/settings/permissiongroups/list'),
                    meta: {
                        title: 'List',
                        roles: ['admin']
                    }
                },
                {
                    path: 'page',
                    name: 'PagePermission',
                    component: () => import('@/views/settings/permissiongroups/page'),
                    meta: {
                        title: 'Page Permission',
                        roles: ['admin'] // or you can only set roles in sub nav
                    }
                },
                {
                    path: 'directive',
                    name: 'DirectivePermission',
                    component: () => import('@/views/settings/permissiongroups/directive'),
                    meta: {
                        title: 'Directive Permission'
                        // if do not set roles, means: this page does not require permission
                    }
                }
            ]
        },
        {
            path: 'users',
            name: 'System Users',
            component: () => import('@/views/settings/users'),
            meta: {
                title: 'System Users',
                icon: 'peoples',
                roles: ['admin']
            }
        }
    ]
}

export default settingsRouter
