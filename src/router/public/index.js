
/* Layout */
import Layout from '@/layouts/public'
import postsRouter from './modules/posts'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
    {
        path: '/',
        component: Layout,
        children: [
            {
                path: '',
                component: () => import('@/views/public/homepage/index'),
                name: 'Homepage',
                meta: { title: 'Homepage', icon: 'dashboard', affix: true }
            }
        ]
    },
    {
        path: '/redirect',
        component: Layout,
        hidden: true,
        children: [
            {
                path: '/redirect/:path(.*)',
                component: () => import('@/views/public/redirect/index')
            }
        ]
    },
    {
        path: '/login',
        component: () => import('@/views/public/login/index'),
        hidden: true
    },
    {
        path: '/auth-redirect',
        component: () => import('@/views/public/login/auth-redirect'),
        hidden: true
    },
    {
        path: '/404',
        component: () => import('@/views/public/error-page/404'),
        hidden: true
    },
    {
        path: '/401',
        component: () => import('@/views/public/error-page/401'),
        hidden: true
    },
    {
        path: '/profile',
        component: Layout,
        redirect: '/profile/index',
        hidden: true,
        children: [
            {
                path: 'index',
                component: () => import('@/views/public/profile/index'),
                name: 'Profile',
                meta: { title: 'Profile', icon: 'user', noCache: true }
            }
        ]
    }
].map(route => {
    route.isSingle = !!(route.children?.length <= 1)
    return route
})

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
    
    /** when your routing map is too long, you can split it into small modules **/
    postsRouter,

    // 404 page must be placed at the end !!!
    { path: '*', redirect: '/404', hidden: true }
].map(route => {
    route.isSingle = !!(route.children?.length <= 1)
    return route
})


export default constantRoutes
