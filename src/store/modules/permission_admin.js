import { asyncRoutes, constantRoutes } from '@/router/admin'
import store from '@/store'

/**
 * Use meta.role to determine if the current user has permission
 * @param permissions
 * @param route
 */
function hasPermission(permissions, route) {
    for (const index in permissions) {
        const path = (route.path).replace(/\/$/, '');
        const test = ('/' + permissions[index]).replace(/\/$/, '');

        // console.log(path, '<-->', test)
        if (test === path || test + '/index' === path || path === '*') {
            return true
        }
    }

    return false
}

function checkIfIsSingle(routes) {
    return routes.map(tmp => {
        tmp.isSingle = !!(tmp.children.length <= 1)
        return tmp
    })
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param permissions
 */
export function filterAsyncRoutes(routes, permissions) {
    const res = []

    // console.log(routes)

    // return routes

    routes.forEach(route => {
        const tmp = { ...route }

        // console.log(tmp)
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
    addRoutes: [],
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
                const routes = JSON.parse(store.getters.permissions.routes).map(route => route.split('@', 2)[0])
                accessedRoutes = filterAsyncRoutes(asyncRoutes, routes)
            }

            commit('SET_ROUTES', accessedRoutes)
            resolve(accessedRoutes)
        })
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
