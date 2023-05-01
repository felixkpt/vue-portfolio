import router from '../router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import getPageTitle from '@/utils/get-page-title'
import { getToken } from '@/utils/auth'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const blacklist = ['/subscriptions'] // redirect blacklists

router.beforeEach(async (to, from, next) => {
    // start progress bar
    NProgress.start()

    // determine whether the user has logged in
    const hasToken = getToken()

    if (hasToken || blacklist.indexOf(to.path) === -1) {
        // in the free login whitelist, go directly or not path admin
        next()
    } else {
        // other pages that do not have permission to access are redirected to the login page.
        next(`/login?redirect=${to.path}`)
        NProgress.done()
    }

    // set page title
    document.title = getPageTitle(to.meta.title)

    // other pages that do not have permission to access are redirected to the login page.
    // next(`/login?redirect=${to.path}`)
    NProgress.done()

})

router.afterEach(() => {
    // finish progress bar
    NProgress.done()
})
