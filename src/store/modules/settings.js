import variables from '@/styles/admin/element-variables.scss'
import defaultSettings from '@/settings'

const { showSettings, tagsViewAdmin, tagsViewPublic, fixedHeader, sidebarLogo, clientSidebarLogo } = defaultSettings

const state = {
  theme: variables.theme,
  showSettings: showSettings,
  tagsViewAdmin: tagsViewAdmin,
  tagsViewPublic: tagsViewPublic,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo,
  clientSidebarLogo: clientSidebarLogo
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

