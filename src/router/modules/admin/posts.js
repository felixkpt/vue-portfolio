/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const postsRouter = {
    path: '/admin/posts',
    name: 'Posts',
    component: Layout,
    redirect: '/posts/list',
    meta: {
        title: 'Posts',
        icon: 'documentation'
    },
    children: [

        {
            path: 'index',
            name: 'all_posts',
            component: () => import('@/views/admin/posts/index'),
            meta: {
                title: 'All Posts',
                icon: 'el-icon-s-flag',
                roles: ['admin']
            }
        },
        {
            path: 'show/:id(\\d+)',
            name: 'Show Post',
            component: () => import('@/views/admin/posts/show'),
            meta: {
                title: 'Show Post',
                roles: ['admin'] // or you can only set roles in sub nav
            },
            hidden: true
        },
        {
            path: 'create',
            name: 'Create Post',
            component: () => import('@/views/admin/posts/create'),
            meta: {
                title: 'Create Post',
                icon: 'form',
                roles: ['admin'] // or you can only set roles in sub nav
            }
        },
        {
            path: 'edit/:id(\\d+)',
            name: 'Edit Post',
            component: () => import('@/views/admin/posts/edit'),
            meta: {
                title: 'Edit Post',
                roles: ['admin'] // or you can only set roles in sub nav
            },
            hidden: true
        }
    ]
}

export default postsRouter
