/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layouts/admin'

const skillsRouter = {

    path: '/admin/skills',
    component: Layout,
    redirect: '/admin/skills/list',
    name: 'Skills',
    meta: {
        title: 'Skills',
        icon: 'el-icon-document-checked'
    },
    children: [
        {
            path: 'list',
            component: () => import('@/views/admin/skills/list'),
            name: 'SkillsList',
            meta: { title: 'Skills List', icon: 'el-icon-document-checked' }
        }
    ]
}

export default skillsRouter
