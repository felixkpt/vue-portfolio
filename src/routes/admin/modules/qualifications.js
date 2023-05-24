/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layouts/admin'

const qualificationsRouter = {

    path: '/admin/qualifications',
    component: Layout,
    redirect: '/admin/qualifications/list',
    name: 'Qualifications',
    meta: {
        title: 'Qualifications',
        icon: 'education'
    },
    children: [
        {
            path: 'list',
            component: () => import('@/views/admin/qualifications/list'),
            name: 'QualificationsList',
            meta: { title: 'Qualifications List', icon: 'education' }
        }
    ]
}

export default qualificationsRouter
