const state = {
    visitedView: [],
    cachedView: []
}

const mutations = {
    addVisitedView: (state, view) => {
        if (state.visitedView.some(e => e.path === view.path)) return
        state.visitedView.push(
            Object.assign({}, view, {
                title: view.meta.title || '无标题'
            })
        )
    },
    addCachedView: (state, view) => {
        if (state.cachedView.includes(view.name)) return
        if (view.meta.cache) {
            state.cachedView.push(view.name)
        }
    },
    delVisitedView: (state, view) => {
        for (const [index, e] of state.visitedView.entries()) {
            if (e.path === view.path) {
                state.visitedView.splice(index, 1)
                break
            }
        }
    },
    delCachedView: (state, view) => {
        const index = state.cachedView.indexOf(view.name)
        index > -1 && state.cachedView.splice(index, 1)
    },
    delOtherVisitedView: (state, view) => {
        state.visitedView = state.visitedView.filter(e => {
            return e.meta.affix || e.path === view.path
        })
    },
    delOtherCachedView: (state, view) => {
        const index = state.cachedView.indexOf(view.name)
        if (index > -1) {
            state.cachedView = state.cachedView.slice(index, index + 1)
        } else {
            // 如果index等于-1 则没有缓存的标签
            state.cachedView = []
        }
    },
    delAllVisitedView: state => {
        // 保存被钉住的标签
        state.visitedView = state.visitedView.filter(tag => tag.meta.affix)
    },
    delAllCachedView: state => {
        state.cachedView = []
    },
    updateVisitedView: (state, view) => {
        for (let e of state.visitedView) {
            if (e.path === view.path) {
                e = Object.assign(e, view)
                break
            }
        }
    }
}

const actions = {
    addView({ dispatch }, view) {
        dispatch('addVisitedView', view)
        dispatch('addCachedView', view)
    },
    addVisitedView({ commit }, view) {
        commit('addVisitedView', view)
    },
    addCachedView({ commit }, view) {
        commit('addCachedView', view)
    },
    delView({ dispatch, state }, view) {
        return new Promise(resolve => {
            dispatch('delVisitedView', view)
            dispatch('delCachedView', view)
            resolve({
                visitedView: [...state.visitedView],
                cachedView: [...state.cachedView]
            })
        })
    },
    delVisitedView({ commit, state }, view) {
        return new Promise(resolve => {
            commit('delVisitedView', view)
            resolve([...state.visitedView])
        })
    },
    delCachedView({ commit, state }, view) {
        return new Promise(resolve => {
            commit('delCachedView', view)
            resolve([...state.cachedView])
        })
    },
    delOtherView({ dispatch, state }, view) {
        return new Promise(resolve => {
            dispatch('delOtherVisitedView', view)
            dispatch('delOtherCachedView', view)
            resolve({
                visitedView: [...state.visitedView],
                cachedView: [...state.cachedView]
            })
        })
    },
    delOtherVisitedView({ commit, state }, view) {
        return new Promise(resolve => {
            commit('delOtherVisitedView', view)
            resolve([...state.visitedView])
        })
    },
    delOtherCachedView({ commit, state }, view) {
        return new Promise(resolve => {
            commit('delOtherCachedView', view)
            resolve([...state.cachedView])
        })
    },
    delAllView({ dispatch, state }, view) {
        return new Promise(resolve => {
            dispatch('delAllVisitedView', view)
            dispatch('delAllCachedView', view)
            resolve({
                visitedView: [...state.visitedView],
                cachedView: [...state.cachedView]
            })
        })
    },
    delAllVisitedView({ commit, state }) {
        return new Promise(resolve => {
            commit('delAllVisitedView')
            resolve([...state.visitedView])
        })
    },
    delAllCachedView({ commit, state }) {
        return new Promise(resolve => {
            commit('delAllCachedView')
            resolve([...state.cachedView])
        })
    },
    updateVisitedView({ commit }, view) {
        commit('updateVisitedView', view)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
