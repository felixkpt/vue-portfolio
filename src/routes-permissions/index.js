import router from '../routes'
import store from '../store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

let counter = 0

router.beforeEach(async (to, from, next) => {
    counter++
    if (counter > 500) return alert('Router error, reload page!')

    // start progress bar
    NProgress.start()

    if (to.path === '/login' && to.query?.admin_token) return next()

    const isPublic = !to.path.startsWith('/admin')

    // set page title
    document.title = getPageTitle(to.meta.title)

    // determine whether the user has logged in
    const hasToken = getToken()

    if (isPublic || hasToken) {

        if (hasToken && to.path === '/login') {
            // if is logged in, redirect to the home page
            next({ path: '/' })
            NProgress.done() // hack: https://github.com/PanJiaChen/pull/2939
        } else {

            // determine whether the user has obtained his permission roles through getInfo
            const hasRoles = store.getters.roles && store.getters.roles.length > 0

            if (hasRoles) {
                next()
            } else {
                try {
                    // get user info
                    // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
                    const { roles } = await store.dispatch('user/getInfo')

                    // generate accessible routes map based on roles
                    const adminAccessRoutes = await store.dispatch('permission_admin/generateRoutes', roles)
                    const clientAccessRoutes = await store.dispatch('permission_client/generateRoutes', roles)

                    // dynamically add accessible routes
                    router.addRoutes([...adminAccessRoutes, ...clientAccessRoutes])

                    // hack method to ensure that addRoutes is complete
                    // set the replace: true, so the navigation will not leave a history record
                    next({ ...to, replace: true })

                } catch (error) {

                    console.log("Error:",error)
                    if (!isPublic || hasToken) {

                        // remove token and go to login page to re-login
                        await store.dispatch('auth/resetToken')
                        Message.error(error || 'Has Error')
                        next(`/login?admin_token=reset&redirect=${to.path}`)
                    }
                    NProgress.done()

                }
            }

        }
    } else if(!isPublic) {
        next(`/login?admin_token=missing&redirect=${to.path}`)
    }
})

router.afterEach(() => {
    // finish progress bar
    NProgress.done()
})
