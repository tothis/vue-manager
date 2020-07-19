// http://mockjs.com/examples.html
const files = require.context('./', true, /\.js$/)
files.keys().forEach(path => {
    if (path !== './index.js') {
        // 加载此模块
        files(path)
    }
})
