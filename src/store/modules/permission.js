import { asyncRoutes, constantRoutes } from '@/router'
import store from '@/store'

/**
 * Use meta.role to determine if the current user has permission
 * @param permissions
 * @param route
 */
function hasPermission(permissions, route) {
    return permissions.some(role => route.path == role || route.path == '*')
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

                tmp.children = filterAsyncRoutes(children, permissions, path)

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

            if (roles.includes('admin')) {
                accessedRoutes = asyncRoutes || []
            } else {
                console.log(store.getters.permissions)
                accessedRoutes = filterAsyncRoutes(asyncRoutes, store.getters.permissions)
            }
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
