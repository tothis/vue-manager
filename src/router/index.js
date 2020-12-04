import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/layout'
import store from '@/store'
import { list, permission } from '@/api/menu'

Vue.use(VueRouter)

// 重写push方法 统一处理错误信息
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

/*
 * 路由树第一层的component可以省略
 * 使用loadRouter方法加载路由 不需要后端返回component 此处需要配置component
 * 使用toRouter方法加载路由 需要后端返回component 此处不需要配置component
 */
const _routes = [
    {
        path: '/example',
        children: [
            {
                path: 'table',
                component: () => import('@/views/table')
            }, {
                path: 'tree',
                component: () => import('@/views/tree')
            }
        ]
    }, {
        path: '/form',
        children: [
            {
                path: 'index',
                component: () => import('@/views/form')
            }
        ]
    }, {
        path: '/dict',
        children: [
            {
                path: 'index',
                component: () => import('@/views/dict')
            }
        ]
    }, {
        path: '/nested',
        children: [
            {
                path: 'menu1',
                component: () => import('@/views/nested/menu1'),
                children: [
                    {
                        path: 'menu1-1',
                        component: () => import('@/views/nested/menu1/menu1-1')
                    }, {
                        path: 'menu1-2',
                        component: () => import('@/views/nested/menu1/menu1-2'),
                        children: [
                            {
                                path: 'menu1-2-1',
                                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1')
                            }, {
                                path: 'menu1-2-2',
                                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2')
                            }
                        ]
                    }, {
                        path: 'menu1-3',
                        component: () => import('@/views/nested/menu1/menu1-3')
                    }
                ]
            }, {
                path: 'menu2',
                component: () => import('@/views/nested/menu2')
            }
        ]
    }
]

const routes = [
    {
        path: '/redirect',
        component: Layout,
        hidden: true,
        children: [
            {
                path: '/redirect/:path*',
                component: () => import('@/views/redirect')
            }
        ]
    },
    {
        path: '/login',
        // 路由懒加载
        component: () => import('@/views/login'),
        meta: { title: '登录' },
        hidden: true
    }, {
        path: '/404',
        component: () => import('@/views/404'),
        meta: { title: '404 page' },
        hidden: true
    }, {
        path: '/',
        redirect: '/dashboard',
        component: Layout,
        children: [{
            path: 'dashboard',
            name: 'dashboard',
            component: () => import('@/views/dashboard'),
            meta: { title: '主页', label: '仪表盘', icon: 'dashboard', affix: true }
        }]
    }
]

const vueRouter = new VueRouter({
    mode: 'hash',
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes
})

export default vueRouter

// 把json转为路由组件 方式一 需要后端保存前端组件目录
export const toRouter = async () => {
    let routerData = await list()
    router(routerData, 1)
    await loadRouterAfter(routerData)
}

const router = (routerData, isParent) => {
    routerData.filter(route => {
        // Layout组件特殊处理
        if (isParent) {
            route.component = Layout
        } else {
            route.component = loadView(route.component)
        }
        if (route.children) {
            router(route.children)
        }
    })
}

const loadView = view => {
    return () => import(`@/views/${view}`)
}

const tempKey = new Date().getTime()

// 把json转为路由组件 方式二 根据节点path拼接定位组件 不需要后端保存组件目录
export const loadRouter = async () => {
    let routerData = await list()
    convertRouter(routerData, 1)
    await loadRouterAfter(routerData)
}

const convertRouter = (routes, isParent, prefix) => {
    prefix = prefix || ''
    routes.filter(route => {
        if (isParent) {
            route.component = Layout
        } else {
            route[tempKey] = prefix + route.path
            localRouter(route)
        }
        // 存在子节点
        if (route.children) {
            convertRouter(route.children, 0, prefix + route.path)
        }
    })
}

// 根据拼接好的路由地址获取本地路由组件
const localRouter = (serverRoute, routes, prefix) => {
    prefix = prefix || ''
    ;(routes || _routes).forEach(route => {
        if (serverRoute[tempKey] === prefix + route.path) {
            serverRoute.component = route.component
        }
        // 存在子节点
        else if (route.children) {
            localRouter(serverRoute, route.children, prefix + route.path)
        }
    })
}

const loadRouterAfter = async routerData => {
    // 防止addRoutes添加路由前访问路由直接跳转404
    routerData.push({ path: '*', redirect: '/404', hidden: true })
    // 添加路由
    vueRouter.addRoutes(routerData)
    // 渲染左侧栏
    await store.dispatch('app/setRouter', routerData)
    // 保存权限数据
    await permission().then(result => store.dispatch('app/setPermission', result))
}
