import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout'

Vue.use(VueRouter)

export const routes = [
    {
        path: '/login',
        component: () => import('@/views/login/index'),
        hidden: true
    }, {
        path: '/404',
        component: () => import('@/views/404'),
        hidden: true
    }, {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [{
            path: 'dashboard',
            name: 'dashboard',
            component: () => import('@/views/dashboard/index'),
            meta: { title: '仪表盘', icon: 'dashboard' }
        }]
    }, {
        path: '/example',
        component: Layout,
        redirect: '/example/table',
        name: 'example',
        meta: { title: 'example', icon: 'example' },
        children: [
            {
                path: 'table',
                name: 'table',
                component: () => import('@/views/table/index'),
                meta: { title: 'table', icon: 'table' }
            }, {
                path: 'tree',
                name: 'tree',
                component: () => import('@/views/tree/index'),
                meta: { title: 'tree', icon: 'tree' }
            }
        ]
    }, {
        path: '/form',
        component: Layout,
        children: [
            {
                path: 'index',
                name: 'form',
                component: () => import('@/views/form/index'),
                meta: { title: 'form', icon: 'form' }
            }
        ]
    }, {
        path: '/nested',
        component: Layout,
        redirect: '/nested/menu1',
        name: 'nested',
        meta: {
            title: 'nested',
            icon: 'nested'
        }, children: [
            {
                path: 'menu1',
                component: () => import('@/views/nested/menu1/index'),
                name: 'menu1',
                meta: { title: 'menu1' },
                children: [
                    {
                        path: 'menu1-1',
                        component: () => import('@/views/nested/menu1/menu1-1'),
                        name: 'menu1-1',
                        meta: { title: 'menu1-1' }
                    }, {
                        path: 'menu1-2',
                        component: () => import('@/views/nested/menu1/menu1-2'),
                        name: 'menu1-2',
                        meta: { title: 'menu1-2' },
                        children: [
                            {
                                path: 'menu1-2-1',
                                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                                name: 'menu1-2-1',
                                meta: { title: 'menu1-2-1' }
                            }, {
                                path: 'menu1-2-2',
                                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                                name: 'menu1-2-2',
                                meta: { title: 'menu1-2-2' }
                            }
                        ]
                    }, {
                        path: 'menu1-3',
                        component: () => import('@/views/nested/menu1/menu1-3'),
                        name: 'menu1-3',
                        meta: { title: 'menu1-3' }
                    }
                ]
            }, {
                path: 'menu2',
                component: () => import('@/views/nested/menu2/index'),
                meta: { title: 'menu2' }
            }
        ]
    }, {
        // 未匹配到的页面 放在最后
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