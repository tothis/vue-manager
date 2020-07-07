import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/layout'
import store from '@/store'

Vue.use(VueRouter)

/*
 * 需要权限控制的路由
 * title 页面标题 不需要展示的路由 省略此属性
 * label 菜单名称 不需要展示的路由 省略此属性
 * icon 菜单图标 不需要展示图标的路由 省略此属性
 */
const _routes = [
    {
        path: '/example',
        redirect: '/example/table',
        component: Layout,
        meta: { title: 'example', label: '示例', icon: 'example' },
        children: [
            {
                path: 'table',
                component: () => import('@/views/table'),
                meta: { title: 'table', label: '表格', icon: 'table' }
            }, {
                path: 'tree',
                component: () => import('@/views/tree'),
                meta: { title: 'tree', label: '树形多选', icon: 'tree' }
            }
        ]
    }, {
        path: '/form',
        component: Layout,
        children: [
            {
                path: 'index',
                component: () => import('@/views/form'),
                meta: { title: 'form', label: '表单', icon: 'form' }
            }
        ]
    }, {
        path: '/nested',
        redirect: '/nested/menu1',
        component: Layout,
        meta: { label: '路由嵌套', icon: 'nested' },
        children: [
            {
                path: 'menu1',
                component: () => import('@/views/nested/menu1'),
                meta: { title: 'menu1', label: '菜单1' },
                children: [
                    {
                        path: 'menu1-1',
                        component: () => import('@/views/nested/menu1/menu1-1'),
                        meta: { title: 'menu1-1', label: '菜单1-1' }
                    }, {
                        path: 'menu1-2',
                        component: () => import('@/views/nested/menu1/menu1-2'),
                        meta: { title: 'menu1-2', label: '菜单1-2' },
                        children: [
                            {
                                path: 'menu1-2-1',
                                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                                meta: { title: 'menu1-2-1', label: '菜单1-2-1' }
                            }, {
                                path: 'menu1-2-2',
                                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                                meta: { title: 'menu1-2-2', label: '菜单1-2-2' }
                            }
                        ]
                    }, {
                        path: 'menu1-3',
                        component: () => import('@/views/nested/menu1/menu1-3'),
                        meta: { title: 'menu1-3', label: '菜单1-3' }
                    }
                ]
            }, {
                path: 'menu2',
                component: () => import('@/views/nested/menu2'),
                meta: { title: 'menu2', label: '菜单2' }
            }
        ]
    }
]
const routes = [
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
            meta: { title: '主页', label: '仪表盘', icon: 'dashboard' }
        }]
    }
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
                route.component = loadView(route.component)
            }
        }
        if (route.children && route.children.length) {
            toRouter(route.children)
        }
    })
    loadRouterAfter(routerData)
}

const loadView = view => {
    return () => import(`@/views/${view}`)
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