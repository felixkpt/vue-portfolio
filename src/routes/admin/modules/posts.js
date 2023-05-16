/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layouts/admin'

const postsRouter = {

    path: '/admin/posts',
    component: Layout,
    redirect: '/posts/list',
    name: 'Posts',
    meta: {
        title: 'Posts',
        icon: 'el-icon-s-help'
    },
    children: [
        {
            path: 'create',
            component: () => import('@/views/admin/posts/create'),
            name: 'CreatePost',
            meta: { title: 'Create Post', icon: 'edit' }
        },
        {
            path: 'edit/:id(\\d+)',
            component: () => import('@/views/admin/posts/edit'),
            name: 'EditPost',
            meta: { title: 'Edit Post', noCache: true, activeMenu: '/posts/list' },
            hidden: true
        },
        {
            path: 'list',
            component: () => import('@/views/admin/posts/list'),
            name: 'PostList',
            meta: { title: 'Post List', icon: 'list' }
        }
    ]
}

export default postsRouter
