import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/**
 * './module' 要读取的目录
 * true 是否读取子目录
 * /\.js$/ 匹配后缀为'.js'的文件
 */
const files = require.context('./module', true, /\.js$/)

const modules = files.keys().reduce((modules, path) => {
    // './app.js' => 'app'
    const name = path.replace(/^\.\/|.js$/g, '')
    modules[name] = files(path).default
    return modules
}, {})

export default new Vuex.Store({
    modules
})
