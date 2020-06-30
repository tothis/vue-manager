const path = require('path')

function resolve(dir) {
    return path.join(__dirname, '.', dir)
}

// https://cli.vuejs.org/zh/config
module.exports = {
    outputDir: 'build', // build输出目录 默认dist
    assetsDir: 'static', // 放置生成的静态资源目录 默认为空
    publicPath: './', // 配置打包后端静态文件引用目录 默认'/'
    devServer: {
        open: true, // 是否自动弹出浏览器页面
        host: 'localhost',
        port: '8888',
        proxy: {
            'api': {
                target: 'http://localhost:8080',
                pathRewrite: {
                    // 重写路径
                    'api': ''
                }
            }
        }
    } // https://cli.vuejs.org/zh/guide/webpack.html
    , chainWebpack: config => {
        // 让其他svg loader不对src/assets/icon进行操作
        config.module
            .rule('svg')
            .exclude.add(resolve('src/assets/icon'))
            .end()
        // 使用svg-sprite-loader对src/assets/icon下的svg进行操作
        config.module
            .rule('icon')
            .test(/\.svg$/)
            .include.add(resolve('src/assets/icon'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            // 定义规则 <svg class="icon"><use xlink:href="#icon-svg文件名"></use></svg>
            .options({
                symbolId: 'icon-[name]'
            })
            .end()
    }
}