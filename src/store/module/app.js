import router from '@/router'

// 侧边栏缓存key
const SIDEBAR_STATE = 'sidebar-state'

const state = {
    sidebar: {
        isOpen: +localStorage.getItem(SIDEBAR_STATE)
    },
    device: 'desktop',
    routes: [],
    permissions: []
}

const mutations = {
    openSideBar: state => {
        state.sidebar.isOpen = 1
        localStorage.setItem(SIDEBAR_STATE, '1')
    },
    closeSideBar: state => {
        state.sidebar.isOpen = 0
        localStorage.setItem(SIDEBAR_STATE, '0')
    },
    setDevice: (state, device) => {
        state.device = device
    },
    setRouter: (state, routes) => {
        state.routes = router.options.routes.concat(routes)
    },
    setPermission: (state, permissions) => {
        state.permissions = permissions
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
    },
    setPermission: ({ commit }, permissions) => {
        commit('setPermission', permissions)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
