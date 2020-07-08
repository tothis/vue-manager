import Cookies from 'js-cookie'
import router from '@/router'

// 侧边栏cookie name
const SIDEBAR_STATE = 'sidebar-state'

const state = {
    sidebar: {
        isOpen: Cookies.get(SIDEBAR_STATE) || 1
    },
    device: 'desktop',
    routes: []
}

const mutations = {
    openSideBar: state => {
        state.sidebar.isOpen = 1
        Cookies.set(SIDEBAR_STATE, 1)
    },
    closeSideBar: state => {
        Cookies.set(SIDEBAR_STATE, 0)
        state.sidebar.isOpen = 0
    },
    setDevice: (state, device) => {
        state.device = device
    },
    setRouter: (state, routes) => {
        state.routes = router.options.routes.concat(routes)
    }
}

const actions = {
    // 打开侧边栏
    openSideBar({ commit }) {
        commit('openSideBar')
    },
    // 关闭侧边栏
    closeSideBar({ commit }) {
        commit('closeSideBar')
    },
    // 设置设备
    setDevice({ commit }, device) {
        commit('setDevice', device)
    },
    setRouter: ({ commit }, routes) => {
        commit('setRouter', routes)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
