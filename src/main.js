import Vue from 'vue'
import App from './app'
import './registerServiceWorker'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import 'normalize.css/normalize.css'
import '@/assets/css/global/index.scss' // 全局样式
import '@/permission' // 权限控制

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')