/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layouts/admin'

const skillsCategoriesRouter = {

    path: '/admin/skills-categories',
    component: Layout,
    redirect: '/admin/skills-categories/list',
    name: 'Skills categories',
    meta: {
        title: 'Skills categories',
        icon: 'el-icon-folder-checked'
    },
    children: [
        {
            path: 'list',
            component: () => import('@/views/admin/skills-categories/list'),
            name: 'Skills categoriesList',
            meta: { title: 'Skills categories List', icon: 'el-icon-folder-checked' }
        }
    ]
}

export default skillsCategoriesRouter
