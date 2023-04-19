/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const settingsRouter = {
  path: '/dashboard/settings',
  name: 'Settings',
  component: Layout,
  redirect: '/settings/permissions/page',
  meta: {
    title: 'Settings',
    icon: 'el-icon-set-up'
  },
  children: [

    {
      path: 'permissions',
      name: 'Permissions',
      redirect: '/settings/permissions/page',
      component: () => import('@/views/settings/permissions/index'), // Parent router-view
      meta: { title: 'Permissions', icon: 'el-icon-s-flag' },
      children: [
        {
          path: 'page',
          name: 'PagePermission',
          component: () => import('@/views/settings/permissions/page'),
          meta: {
            title: 'Page Permission',
            roles: ['admin'] // or you can only set roles in sub nav
          }
        },
        {
          path: 'directive',
          name: 'DirectivePermission',
          component: () => import('@/views/settings/permissions/directive'),
          meta: {
            title: 'Directive Permission'
            // if do not set roles, means: this page does not require permission
          }
        },
        {
          path: 'role',
          name: 'RolePermission',
          component: () => import('@/views/settings/permissions/role'),
          meta: {
            title: 'Role Permission',
            roles: ['admin']
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
