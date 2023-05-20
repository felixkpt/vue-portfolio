import { asyncRoutes, constantRoutes } from '@/routes/client'

const state = {
    routes: [],
    addRoutes: []
}

const mutations = {
    SET_PUBLIC_ROUTES: (state, routes) => {
        state.addRoutes = routes

        state.routes = constantRoutes.concat(routes)
    }
}

const actions = {

    generateRoutes({ commit }, roles) {
        return new Promise(resolve => {
            let accessedRoutes

            accessedRoutes = asyncRoutes || []

            commit('SET_PUBLIC_ROUTES', accessedRoutes)
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
