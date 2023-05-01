
/* Layout */
import Layout from '@/layouts/admin'
import PublicLayout from '@/layouts/public'

/* Admin Router Modules */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
import nestedRouter from './modules/nested'
import countriesRouter from './modules/countries'
import settingsRouter from './modules/settings'
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
        component: PublicLayout,
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
                component: () => import('@/views/admin/redirect/index')
            }
        ]
    },
    {
        path: '/404',
        component: () => import('@/views/admin/error-page/404'),
        hidden: true
    },
    {
        path: '/401',
        component: () => import('@/views/admin/error-page/401'),
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

    {
        path: '/documentation',
        component: Layout,
        children: [
            {
                path: 'index',
                component: () => import('@/views/admin/documentation/index'),
                name: 'Documentation',
                meta: { title: 'Documentation', icon: 'documentation', affix: true }
            }
        ]
    },
    {
        path: '/guide',
        component: Layout,
        redirect: '/guide/index',
        children: [
            {
                path: 'index',
                component: () => import('@/views/admin/guide/index'),
                name: 'Guide',
                meta: { title: 'Guide', icon: 'guide', noCache: true }
            }
        ]
    },
    {
        path: '/icon',
        component: Layout,
        children: [
            {
                path: 'index',
                component: () => import('@/views/admin/icons/index'),
                name: 'Icons',
                meta: { title: 'Icons', icon: 'icon', noCache: true }
            }
        ]
    },

    /** when your routing map is too long, you can split it into small modules **/
    componentsRouter,
    chartsRouter,
    nestedRouter,
    settingsRouter,
    tableRouter,
    countriesRouter,
    postsRouter,

    {
        path: '/tab',
        component: Layout,
        children: [
            {
                path: 'index',
                component: () => import('@/views/admin/tab/index'),
                name: 'Tab',
                meta: { title: 'Tab', icon: 'tab' }
            }
        ]
    },

    {
        path: '/error',
        component: Layout,
        redirect: 'noRedirect',
        name: 'ErrorPages',
        meta: {
            title: 'Error Pages',
            icon: '404'
        },
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
        path: '/error-log',
        component: Layout,
        children: [
            {
                path: 'log',
                component: () => import('@/views/admin/error-log/index'),
                name: 'ErrorLog',
                meta: { title: 'Error Log', icon: 'bug' }
            }
        ]
    },

    {
        path: '/excel',
        component: Layout,
        redirect: '/excel/export-excel',
        name: 'Excel',
        meta: {
            title: 'Excel',
            icon: 'excel'
        },
        children: [
            {
                path: 'export-excel',
                component: () => import('@/views/admin/excel/export-excel'),
                name: 'ExportExcel',
                meta: { title: 'Export Excel' }
            },
            {
                path: 'export-selected-excel',
                component: () => import('@/views/admin/excel/select-excel'),
                name: 'SelectExcel',
                meta: { title: 'Export Selected' }
            },
            {
                path: 'export-merge-header',
                component: () => import('@/views/admin/excel/merge-header'),
                name: 'MergeHeader',
                meta: { title: 'Merge Header' }
            },
            {
                path: 'upload-excel',
                component: () => import('@/views/admin/excel/upload-excel'),
                name: 'UploadExcel',
                meta: { title: 'Upload Excel' }
            }
        ]
    },

    {
        path: '/zip',
        component: Layout,
        redirect: '/zip/download',
        alwaysShow: true,
        name: 'Zip',
        meta: { title: 'Zip', icon: 'zip' },
        children: [
            {
                path: 'download',
                component: () => import('@/views/admin/zip/index'),
                name: 'ExportZip',
                meta: { title: 'Export Zip' }
            }
        ]
    },

    {
        path: '/pdf',
        component: Layout,
        redirect: '/pdf/index',
        children: [
            {
                path: 'index',
                component: () => import('@/views/admin/pdf/index'),
                name: 'PDF',
                meta: { title: 'PDF', icon: 'pdf' }
            }
        ]
    },
    {
        path: '/pdf/download',
        component: () => import('@/views/admin/pdf/download'),
        hidden: true
    },

    {
        path: '/theme',
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

    {
        path: '/clipboard',
        component: Layout,
        children: [
            {
                path: 'index',
                component: () => import('@/views/admin/clipboard/index'),
                name: 'ClipboardDemo',
                meta: { title: 'Clipboard', icon: 'clipboard' }
            }
        ]
    },

    // 404 page must be placed at the end !!!
    { path: '*', redirect: '/404', hidden: true }
].map(route => {
    route.isSingle = !!(route.children?.length <= 1)
    return route
})


export default constantRoutes