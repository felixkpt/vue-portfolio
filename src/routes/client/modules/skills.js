/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layouts/client'

const skillsRouter = [
    {

        path: '/skills',
        component: Layout,
        redirect: '/skills/list',
        name: 'Skills',
        meta: {
            title: 'Skills',
            icon: 'el-icon-s-help'
        },

        children: [
            {
                path: 'list',
                component: () => import('@/views/client/skills/list'),
                name: 'Skills',
                meta: { title: 'Skills', icon: 'el-icon-guide' }
            },
        ]
    },
    {

        path: '/skills/view',
        component: Layout,
        redirect: '/skills/list',
        name: 'Skill',
        meta: {
            title: 'Skill',
            icon: 'el-icon-s-help'
        },
        hidden: true,

        children: [
            {
                path: ':slug',
                component: () => import('@/views/client/skills/view'),
                name: 'SkillView',
                meta: { title: 'Skill View', noCache: true, activeMenu: '/skills/list' },
                hidden: true
            }
        ]
    }

]

export default skillsRouter
