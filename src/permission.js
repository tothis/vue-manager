import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/util/auth'


NProgress.configure({ showSpinner: false })

// 未登录白名单
const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
    // 加载进度条开始
    NProgress.start()

    // 设置页面标题
    document.title = to.name

    // 确定用户是否已登录
    const hasToken = getToken()

    if (hasToken) {
        if (to.path === '/login') {
            // 如果已登录 请重定向到主页
            next({ path: '/' })
            NProgress.done()
        } else {
            next()
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next(`/login?redirect=${to.path}`)
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    // 加载进度条结束
    NProgress.done()
})