import Mock from 'mockjs'

/*
 * 需要权限控制的路由
 *
 * meta
 *   label 导航栏 菜单名称 不需要展示的路由 省略此属性
 *   title 侧边栏 页面标题 不需要访问的路由 省略此属性
 *   icon 侧边栏 菜单图标 不需要展示图标的路由 省略此属性
 *   affix 导航栏 是否钉住 不需要钉住的路由 省略此属性
 *   cache 是否缓存 不需要缓存的路由 省略此属性 路由name需和组件name保持一致方可缓存成功
 */
Mock.mock('/menu/list', 'get', [
    {
        name: 'i-example',
        path: '/example',
        redirect: '/example/table',
        meta: { label: '示例', icon: 'example' },
        children: [
            {
                name: 'i-table',
                path: 'table',
                component: 'table',
                meta: {
                    title: 'table',
                    label: '表格',
                    icon: 'table',
                    affix: true,
                    cache: true
                }
            }, {
                name: 'i-tree',
                path: 'tree',
                component: 'tree',
                meta: { title: 'tree', label: '树形多选', icon: 'tree', cache: true }
            }
        ]
    }, {
        path: '/form',
        children: [
            {
                name: 'i-form',
                path: 'index',
                component: 'form',
                meta: { title: 'form', label: '表单', icon: 'form' }
            }
        ]
    }, {
        path: '/nested',
        redirect: '/nested/menu1',
        meta: { label: '路由嵌套', icon: 'nested' },
        children: [
            {
                name: 'menu1',
                path: 'menu1',
                component: 'nested/menu1',
                meta: { title: 'menu1', label: '菜单1' },
                children: [
                    {
                        name: 'menu1-1',
                        path: 'menu1-1',
                        component: 'nested/menu1/menu1-1',
                        meta: { title: 'menu1-1', label: '菜单1-1' }
                    }, {
                        name: 'menu1-2',
                        path: 'menu1-2',
                        component: 'nested/menu1/menu1-2',
                        meta: { title: 'menu1-2', label: '菜单1-2' },
                        children: [
                            {
                                name: 'menu1-2-1',
                                path: 'menu1-2-1',
                                component: 'nested/menu1/menu1-2/menu1-2-1',
                                meta: { title: 'menu1-2-1', label: '菜单1-2-1' }
                            }, {
                                name: 'menu1-2-2',
                                path: 'menu1-2-2',
                                component: 'nested/menu1/menu1-2/menu1-2-2',
                                meta: { title: 'menu1-2-2', label: '菜单1-2-2' }
                            }
                        ]
                    }, {
                        name: 'menu1-3',
                        path: 'menu1-3',
                        component: 'nested/menu1/menu1-3',
                        meta: { title: 'menu1-3', label: '菜单1-3' }
                    }
                ]
            }, {
                name: 'menu2',
                path: 'menu2',
                component: 'nested/menu2',
                meta: { title: 'menu2', label: '菜单2' }
            }
        ]
    }
])

Mock.mock('/menu/permission', 'get', ['root', 'staff'])
