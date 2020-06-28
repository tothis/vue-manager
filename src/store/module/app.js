import Cookies from 'js-cookie'

// 侧边栏cookie name
const SIDEBAR_STATE = 'sidebar-state'

const state = {
    sidebar: {
        opened: Cookies.get(SIDEBAR_STATE) || true,
        withoutAnimation: false
    },
    device: 'desktop'
}

const mutations = {
    toggleSideBar: state => {
        state.sidebar.opened = !state.sidebar.opened
        state.sidebar.withoutAnimation = false
        if (state.sidebar.opened) {
            Cookies.set(SIDEBAR_STATE, 1)
        } else {
            Cookies.set(SIDEBAR_STATE, 0)
        }
    },
    closeSideBar: (state, withoutAnimation) => {
        Cookies.set(SIDEBAR_STATE, 0)
        state.sidebar.opened = false
        state.sidebar.withoutAnimation = withoutAnimation
    },
    setDevice: (state, device) => {
        state.device = device
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
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}