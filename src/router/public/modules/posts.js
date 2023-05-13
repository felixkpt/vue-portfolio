/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layouts/public'

const postsRouter = {

    path: '/posts',
    component: Layout,
    redirect: '/posts/list',
    name: 'Posts',
    meta: {
        title: 'Posts',
        icon: 'el-icon-s-help'
    },
    children: [
        {
            path: 'list',
            component: () => import('@/views/public/posts/list'),
            name: 'PostList',
            meta: { title: 'Post List', icon: 'list' }
        },
        {
            path: 'show/:slug',
            component: () => import('@/views/public/posts/show'),
            name: 'ShowPost',
            meta: { title: 'Show Post', noCache: true, activeMenu: '/posts/list' },
            hidden: true
        }
    ]
}

export default postsRouter
