import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './module/app'
import settings from './module/settings'
import user from './module/user'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        app,
        settings,
        user
    },
    getters
})