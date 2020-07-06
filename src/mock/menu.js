import Mock from 'mockjs'

Mock.mock('/menu/list', 'get', [
    {
        path: '/example',
        redirect: '/example/table',
        component: 'Layout',
        meta: { title: 'example', label: '示例', icon: 'example' },
        children: [
            {
                path: 'table',
                component: 'table',
                meta: { title: 'table', label: '表格', icon: 'table' }
            }, {
                path: 'tree',
                component: 'tree',
                meta: { title: 'tree', label: '树形多选', icon: 'tree' }
            }
        ]
    }, {
        path: '/form',
        component: 'Layout',
        children: [
            {
                path: 'index',
                component: 'form',
                meta: { title: 'form', label: '表单', icon: 'form' }
            }
        ]
    }, {
        path: '/nested',
        redirect: '/nested/menu1',
        component: 'Layout',
        meta: { label: '路由嵌套', icon: 'nested' },
        children: [
            {
                path: 'menu1',
                component: 'nested/menu1',
                meta: { title: 'menu1', label: '菜单1' },
                children: [
                    {
                        path: 'menu1-1',
                        component: 'nested/menu1/menu1-1',
                        meta: { title: 'menu1-1', label: '菜单1-1' }
                    }, {
                        path: 'menu1-2',
                        component: 'nested/menu1/menu1-2',
                        meta: { title: 'menu1-2', label: '菜单1-2' },
                        children: [
                            {
                                path: 'menu1-2-1',
                                component: 'nested/menu1/menu1-2/menu1-2-1',
                                meta: { title: 'menu1-2-1', label: '菜单1-2-1' }
                            }, {
                                path: 'menu1-2-2',
                                component: 'nested/menu1/menu1-2/menu1-2-2',
                                meta: { title: 'menu1-2-2', label: '菜单1-2-2' }
                            }
                        ]
                    }, {
                        path: 'menu1-3',
                        component: 'nested/menu1/menu1-3',
                        meta: { title: 'menu1-3', label: '菜单1-3' }
                    }
                ]
            }, {
                path: 'menu2',
                component: 'nested/menu2',
                meta: { title: 'menu2', label: '菜单2' }
            }
        ]
    }
])