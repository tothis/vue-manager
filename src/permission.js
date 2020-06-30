import router, { loadRouter } from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/util/auth'

NProgress.configure({ showSpinner: false })

// 未登录白名单
const whiteList = ['/login']

router.beforeEach((to, from, next) => {
    // 加载进度条开始
    NProgress.start()

    // 设置页面标题
    document.title = to.name

    // 确定用户是否已登录
    if (getToken()) {
        if (to.path === '/login') {
            // 如果已登录 请重定向到主页
            next({ path: '/' })
        } else {
            if (!store.state.app.routes.length) {
                // 登录成功后加载用户路由
                let routerData = [{ 'path': '/form', 'name': '表单', 'component': 'Layout', 'children': [{ 'path': 'index', 'name': 'form', 'component': 'form', 'meta': { 'title': 'form', 'icon': 'form' } }] }, { 'path': '/user', 'name': '用户', 'component': 'Layout', 'children': [{ 'path': 'index', 'name': 'user', 'component': 'user', 'meta': { 'title': 'user', 'icon': 'user' } }] }, { 'path': '/nested', 'name': '路由嵌套', 'component': 'Layout', 'redirect': '/nested/menu1', 'meta': { 'title': '路由嵌套', 'icon': 'nested' }, 'children': [{ 'path': 'menu1', 'name': 'menu1', 'component': 'nested/menu1', 'meta': { 'title': 'menu1' }, 'children': [{ 'path': 'menu1-1', 'name': 'menu1-1', 'component': 'nested/menu1/menu1-1', 'meta': { 'title': 'menu1-1' } }, { 'path': 'menu1-2', 'name': 'menu1-2', 'component': 'nested/menu1/menu1-2', 'meta': { 'title': 'menu1-2' }, 'children': [{ 'path': 'menu1-2-1', 'name': 'menu1-2-1', 'component': 'nested/menu1/menu1-2/menu1-2-1', 'meta': { 'title': 'menu1-2-1' } }, { 'path': 'menu1-2-2', 'name': 'menu1-2-2', 'component': 'nested/menu1/menu1-2/menu1-2-2', 'meta': { 'title': 'menu1-2-2' } }] }, { 'path': 'menu1-3', 'name': 'menu1-3', 'component': 'nested/menu1/menu1-3', 'meta': { 'title': 'menu1-3' } }] }, { 'path': 'menu2', 'name': 'menu2', 'component': 'nested/menu2', 'meta': { 'title': 'menu2' } }] }]
                // toRouter(routerData)
                loadRouter(routerData)
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