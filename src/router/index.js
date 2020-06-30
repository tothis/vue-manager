import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout'
import store from '@/store'

Vue.use(VueRouter)

const _routes = [
    {
        path: '/example',
        name: '示例',
        component: Layout,
        redirect: '/example/table',
        meta: { title: 'example', icon: 'example' },
        children: [
            {
                path: 'table',
                name: '表格',
                component: () => import('@/views/table'),
                meta: { title: 'table', icon: 'table' }
            }, {
                path: 'tree',
                name: '树形多选',
                component: () => import('@/views/tree'),
                meta: { title: 'tree', icon: 'tree' }
            }
        ]
    }, {
        path: '/form',
        name: '表单',
        component: Layout,
        children: [
            {
                path: 'index',
                name: 'form',
                component: () => import('@/views/form'),
                meta: { title: 'form', icon: 'form' }
            }
        ]
    }, {
        path: '/nested',
        name: '路由嵌套',
        component: Layout,
        redirect: '/nested/menu1',
        meta: {
            title: '路由嵌套',
            icon: 'nested'
        }, children: [
            {
                path: 'menu1',
                name: 'menu1',
                component: () => import('@/views/nested/menu1'),
                meta: { title: 'menu1' },
                children: [
                    {
                        path: 'menu1-1',
                        name: 'menu1-1',
                        component: () => import('@/views/nested/menu1/menu1-1'),
                        meta: { title: 'menu1-1' }
                    }, {
                        path: 'menu1-2',
                        name: 'menu1-2',
                        component: () => import('@/views/nested/menu1/menu1-2'),
                        meta: { title: 'menu1-2' },
                        children: [
                            {
                                path: 'menu1-2-1',
                                name: 'menu1-2-1',
                                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                                meta: { title: 'menu1-2-1' }
                            }, {
                                path: 'menu1-2-2',
                                name: 'menu1-2-2',
                                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                                meta: { title: 'menu1-2-2' }
                            }
                        ]
                    }, {
                        path: 'menu1-3',
                        name: 'menu1-3',
                        component: () => import('@/views/nested/menu1/menu1-3'),
                        meta: { title: 'menu1-3' }
                    }
                ]
            }, {
                path: 'menu2',
                name: 'menu2',
                component: () => import('@/views/nested/menu2'),
                meta: { title: 'menu2' }
            }
        ]
    }
]
const routes = [
    {
        path: '/login',
        name: '登录',
        // 路由懒加载
        component: () => import('@/views/login'),
        hidden: true
    }, {
        path: '/404',
        name: '404',
        component: () => import('@/views/404'),
        hidden: true
    }, {
        path: '/',
        name: '主页',
        component: Layout,
        redirect: '/i-dashboard',
        children: [{
            path: 'i-dashboard',
            name: '仪表盘',
            component: () => import('@/views/dashboard'),
            meta: { title: '仪表盘', icon: 'dashboard' }
        }]
    }
    /*, {
        path: '/example',
        name: '示例',
        component: Layout,
        redirect: '/example/table',
        meta: { title: 'example', icon: 'example' },
        children: [
            {
                path: 'table',
                name: '表格',
                component: () => import('@/views/table'),
                meta: { title: 'table', icon: 'table' }
            }, {
                path: 'tree',
                name: '树形多选',
                component: () => import('@/views/tree'),
                meta: { title: 'tree', icon: 'tree' }
            }
        ]
    }, {
        path: '/form',
        name: '表单',
        component: Layout,
        children: [
            {
                path: 'index',
                name: 'form',
                component: () => import('@/views/form'),
                meta: { title: 'form', icon: 'form' }
            }
        ]
    }, {
        path: '/nested',
        name: '路由嵌套',
        component: Layout,
        redirect: '/nested/menu1',
        meta: {
            title: '路由嵌套',
            icon: 'nested'
        }, children: [
            {
                path: 'menu1',
                name: 'menu1',
                component: () => import('@/views/nested/menu1'),
                meta: { title: 'menu1' },
                children: [
                    {
                        path: 'menu1-1',
                        name: 'menu1-1',
                        component: () => import('@/views/nested/menu1/menu1-1'),
                        meta: { title: 'menu1-1' }
                    }, {
                        path: 'menu1-2',
                        name: 'menu1-2',
                        component: () => import('@/views/nested/menu1/menu1-2'),
                        meta: { title: 'menu1-2' },
                        children: [
                            {
                                path: 'menu1-2-1',
                                name: 'menu1-2-1',
                                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                                meta: { title: 'menu1-2-1' }
                            }, {
                                path: 'menu1-2-2',
                                name: 'menu1-2-2',
                                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                                meta: { title: 'menu1-2-2' }
                            }
                        ]
                    }, {
                        path: 'menu1-3',
                        name: 'menu1-3',
                        component: () => import('@/views/nested/menu1/menu1-3'),
                        meta: { title: 'menu1-3' }
                    }
                ]
            }, {
                path: 'menu2',
                name: 'menu2',
                component: () => import('@/views/nested/menu2'),
                meta: { title: 'menu2' }
            }
        ]
    }*/
]

const vueRouter = new VueRouter({
    mode: 'hash',
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes
})

export default vueRouter

// 把json转为路由组件 方式一
export const toRouter = routerData => {
    routerData.filter(route => {
        if (route.component) {
            // Layout组件特殊处理
            if (route.component === 'Layout') {
                route.component = Layout
            } else {
                route.component = import(`@/views/${route.component}`)
            }
        }
        if (route.children && route.children.length) {
            toRouter(route.children)
        }
    })
    loadRouterAfter(routerData)
}

// 把json转为路由组件 方式二
export const loadRouter = routerData => {
    routerData.filter(route => {
        convertRouter(route)
        if (route.children && route.children.length) {
            loadRouter(route.children)
        }
    })
    loadRouterAfter(routerData)
}

const convertRouter = (route, children, prefix) => {
    if (route.component) {
        // Layout组件特殊处理
        if (route.component === 'Layout') {
            route.component = Layout
        } else if (route.path) {
            prefix = prefix || ''
            let routePath = prefix + route.path
                // 自调用函数前得加分号
            ;(children || _routes).filter(item => {
                let itemPath = prefix + item.path
                if (routePath === itemPath) {
                    route.component = item.component
                } else if (item.children && item.children.length) {
                    convertRouter(route, item.children, routePath)
                }
            })
        }
    }
}

const loadRouterAfter = routerData => {
    // 防止addRoutes添加路由前访问路由直接跳转404
    routerData.push({ path: '*', redirect: '/404', hidden: true })
    // 添加路由
    vueRouter.addRoutes(routerData)
    // 渲染左侧栏
    store.dispatch('app/setRouter', routerData)
}