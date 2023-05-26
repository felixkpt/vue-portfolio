
/* Layout */
import Layout from '@/layouts/admin'
import PublicLayout from '@/layouts/client'

/* Admin Router Modules */
import settingsRouter from './modules/settings'
import projectsRouter from './modules/projects'
import companiesRouter from './modules/companies'
import skillsRouter from './modules/skills'
import qualificationsRouter from './modules/qualifications'
import contactsRouter from './modules/contacts'
import aboutRouter from './modules/about'
import skillsCategoriesRouter from './modules/skills-categories'

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
        component: PublicLayout,
        children: [
            {
                path: '',
                component: () => import('@/views/client/homepage/index'),
                name: 'Homepage',
                meta: { title: 'Homepage', icon: 'el-icon-s-home', affix: true }
            }
        ]
    },
    {
        path: '/admin/redirect',
        component: Layout,
        hidden: true,
        children: [
            {
                path: '/admin/redirect/:path(.*)',
                component: () => import('@/views/admin/redirect/index')
            }
        ]
    },
    {
        path: '/admin/404',
        component: () => import('@/views/admin/error-page/404'),
        hidden: true
    },
    {
        path: '/admin/401',
        component: () => import('@/views/admin/error-page/401'),
        hidden: true
    },
    {
        path: '/admin/profile',
        component: Layout,
        redirect: '/profile/index',
        hidden: true,
        children: [
            {
                path: 'index',
                component: () => import('@/views/admin/profile/index'),
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
    {
        path: '/admin',
        component: Layout,
        children: [
            {
                path: '',
                component: () => import('@/views/admin/admin/index'),
                name: 'Admin Dashboard',
                meta: { title: 'Admin Dashboard', icon: 'dashboard', affix: true }
            }
        ]
    },

    /** when your routing map is too long, you can split it into small modules **/
    projectsRouter,
    skillsRouter,
    skillsCategoriesRouter,
    qualificationsRouter,
    companiesRouter,
    contactsRouter,
    aboutRouter,
    settingsRouter,

    {
        path: '/admin/error',
        component: Layout,
        redirect: 'noRedirect',
        name: 'ErrorPages',
        meta: {
            title: 'Error Pages',
            icon: '404'
        },
        hidden: true,
        children: [
            {
                path: '401',
                component: () => import('@/views/admin/error-page/401'),
                name: 'Page401',
                meta: { title: '401', noCache: true }
            },
            {
                path: '404',
                component: () => import('@/views/admin/error-page/404'),
                name: 'Page404',
                meta: { title: '404', noCache: true }
            }
        ]
    },


    {
        path: '/admin/theme',
        component: Layout,
        children: [
            {
                path: 'index',
                component: () => import('@/views/admin/theme/index'),
                name: 'Theme',
                meta: { title: 'Theme', icon: 'theme' }
            }
        ]
    },

    // 404 page must be placed at the end !!!
    { path: '/admin/*', redirect: '/404', hidden: true }
].map(route => {
    route.isSingle = !!(route.children?.length <= 1)
    return route
})

export default constantRoutes
