import { register, login, logout } from '@/api/auth'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/routes'
import { getInfo } from '@/api/user'

const state = {
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: []
}

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
        state.introduction = introduction
    },
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles
    }
}

const actions = {
    // user register
    register({ commit }, userInfo) {
        const { name, email, phone, password, password_confirmation } = userInfo
        return new Promise((resolve, reject) => {
            register({ name: name.trim(), email: email.trim(), phone: phone.trim(), password, password_confirmation }).then(response => {
                commit('SET_TOKEN', response.token)
                setToken(response.token)

                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // user login
    login({ commit }, userInfo) {
        const { username, password } = userInfo
        return new Promise((resolve, reject) => {
            login({ username: username.trim(), password: password }).then(response => {
                commit('SET_TOKEN', response.token)
                setToken(response.token)

                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // user logout
    logout({ commit, state, dispatch }) {
        return new Promise((resolve, reject) => {
            logout(state.token).then(() => {
                commit('SET_TOKEN', '')
                commit('SET_ROLES', [])
                removeToken()
                resetRouter()

                // reset visited views and cached views
                // to fixed https://github.com/PanJiaChen/issues/2485
                dispatch('tagsViewAdmin/delAllViews', null, { root: true })
                dispatch('tagsViewPublic/delAllViews', null, { root: true })

                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // remove token
    resetToken({ commit }) {
        return new Promise(resolve => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            removeToken()
            resolve()
        })
    }

}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
