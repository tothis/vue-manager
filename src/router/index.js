import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout'

Vue.use(VueRouter)

export const routes = [
    {
        path: '/login',
        name: '登录',
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
    }, {
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
    }, {
        // 未匹配到的页面处理 放在最后
        path: '*', redirect: '/404', hidden: true
    }
]

const createRouter = () => new VueRouter({
    mode: 'hash',
    scrollBehavior: () => ({ y: 0 }),
    routes: routes
})

const router = createRouter()

// 动态替换路由
export function resetRouter() {
    const newRouter = createRouter()
    // 重置router
    router.matcher = newRouter.matcher
}

export default router