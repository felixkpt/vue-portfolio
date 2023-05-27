/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layouts/admin'

const projectsRouter = {

    path: '/admin/projects',
    component: Layout,
    redirect: '/admin/projects/list',
    name: 'Projects',
    meta: {
        title: 'Projects',
        icon: 'el-icon-s-help'
    },
    children: [
        {
            path: 'create',
            component: () => import('@/views/admin/projects/create'),
            name: 'CreateProject',
            meta: { title: 'Create Project', icon: 'edit' }
        },
        {
            path: 'edit/:id',
            component: () => import('@/views/admin/projects/edit'),
            name: 'EditProject',
            meta: { title: 'Edit Project', noCache: true, activeMenu: '/admin/projects/list' },
            hidden: true
        },
        {
            path: 'list',
            component: () => import('@/views/admin/projects/list'),
            name: 'ProjectList',
            meta: { title: 'Project List', icon: 'list' }
        }
    ]
}

export default projectsRouter
