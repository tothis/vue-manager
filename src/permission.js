import router, { toRouter } from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/util/auth'
import { getMenu } from '@/api/menu'

NProgress.configure({ showSpinner: false })

// 未登录白名单
const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
    // 加载进度条开始
    NProgress.start()

    // 设置页面标题
    document.title = to.meta.title

    // 确定用户是否已登录
    // if (getToken()) {
    // 假设用户已登录
    if (!getToken()) {
        if (to.path === '/login') {
            // 如果已登录 请重定向到主页
            next({ path: '/' })
        } else {
            if (!store.state.app.routes.length) {
                // 登录成功后加载用户路由
                let routerData
                await getMenu().then(result => routerData = result)
                toRouter(routerData)
                // loadRouter(routerData)
                // 防止浏览器直接输入路由页面白屏
                // next(to)
                // replace为true 跳转时 会执行router.replace() 而非router.push()
                next({ ...to, replace: true })
            } else {
                next()
            }
        }
    } else {
        // 无token时 验证白名单
        if (whiteList.indexOf(to.path) > -1) {
            next()
        } else {
            next(`/login?redirect=${to.path}`)
        }
    }
})

router.afterEach(() => {
    // 加载进度条结束
    NProgress.done()
})