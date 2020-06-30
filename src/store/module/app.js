import Cookies from 'js-cookie'
import router from '@/router'

// 侧边栏cookie name
const SIDEBAR_STATE = 'sidebar-state'

const state = {
    sidebar: {
        isOpen: Cookies.get(SIDEBAR_STATE) || true,
        withoutAnimation: false
    },
    device: 'desktop',
    routes: []
}

const mutations = {
    toggleSideBar: state => {
        state.sidebar.isOpen = !state.sidebar.isOpen
        state.sidebar.withoutAnimation = false
        if (state.sidebar.isOpen) {
            Cookies.set(SIDEBAR_STATE, 1)
        } else {
            Cookies.set(SIDEBAR_STATE, 0)
        }
    },
    closeSideBar: (state, withoutAnimation) => {
        Cookies.set(SIDEBAR_STATE, 0)
        state.sidebar.isOpen = false
        state.sidebar.withoutAnimation = withoutAnimation
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
    toggleSideBar({ commit }) {
        commit('toggleSideBar')
    },
    // 关闭侧边栏
    closeSideBar({ commit }, { withoutAnimation }) {
        commit('closeSideBar', withoutAnimation)
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