import { asyncRoutes, constantRoutes } from '@/router'
import store from '@/store'

/**
 * Use meta.role to determine if the current user has permission
 * @param permissions
 * @param route
 */
function hasPermission(permissions, route) {

    for (let index in permissions) {
        const permission = permissions[index]
        const test = ('/dashboard/' + permission).replace(/\/+/g, '/')
        if (test == route.path || route.path == '*') {
            return true
        }
    }

    return false

}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param permissions
 */
export function filterAsyncRoutes(routes, permissions) {
    const res = []

    routes.forEach(route => {

        const tmp = { ...route }
        if (hasPermission(permissions, tmp)) {
            if (tmp.children) {
                const path = tmp.path
                const children = []
                tmp.children.forEach(child => children.push({ ...child, path: (path + '/' + child.path).replace(/\/+/g, '/') }))

                tmp.children = filterAsyncRoutes(children, permissions)
            }

            res.push(tmp)
        }
    })

    return res
}

const state = {
    routes: [],
    addRoutes: []
}

const mutations = {
    SET_ROUTES: (state, routes) => {
        state.addRoutes = routes
        state.routes = constantRoutes.concat(routes)
    }
}

const actions = {

    generateRoutes({ commit }, roles) {
        return new Promise(resolve => {
            let accessedRoutes

            // if (roles.includes('admin')) {
            accessedRoutes = asyncRoutes || []
            // } else {
            const routes = JSON.parse(store.getters.permissions.routes)
            accessedRoutes = filterAsyncRoutes(asyncRoutes, routes)
            console.log(accessedRoutes)

            // }
            commit('SET_ROUTES', accessedRoutes)
            resolve(accessedRoutes)
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
