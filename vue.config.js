// https://cli.vuejs.org/zh/config
module.exports = {
    outputDir: 'build', // build输出目录 默认dist
    assetsDir: 'static', // 放置生成的静态资源目录 默认为空
    publicPath: './', // 配置打包后端静态文件引用目录 默认'/'
    devServer: {
        open: true, // 是否自动弹出浏览器页面
        host: 'localhost',
        port: '8888',
        // https: true, // 是否使用https协议
        proxy: {
            'api': {
                target: 'http://localhost:8080',
                ws: true, // 代理websocket
                // 设成true 请求头host会设成target 默认true
                changeOrigin: true,
                pathRewrite: {
                    // 重写路径 比如`/api`重写为`/file`
                    'api': 'file'
                }
            },
            'file-upload': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                pathRewrite: {
                    'file-upload': 'file'
                }
            }
        }
    }
}
