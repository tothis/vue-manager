import Vue from 'vue'
import App from './app'
import './registerServiceWorker'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// css优化
import 'normalize.css/normalize.css'
// svg图标
import '@/assets/icon'
// 权限控制
import '@/permission'
// 指令
import '@/directive'
// 全局样式
import '@/assets/css/global/index.scss'
// 引用mock
import './mock'
import VueParticles from 'vue-particles'

Vue.use(ElementUI)
Vue.use(VueParticles)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
