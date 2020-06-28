// https://cli.vuejs.org/zh/config
module.exports = {
    outputDir: 'build', // build输出目录 默认dist
    assetsDir: 'static', // 放置生成的静态资源目录 默认为空
    publicPath: './', // 配置打包后端静态文件引用目录 默认'/'
    devServer: {
        open: true, // 是否自动弹出浏览器页面
        host: 'localhost',
        port: '8888',
        proxy: 'http://localhost:8080'
    }
}