import Vue from 'vue'
import store from '@/store'

function checkPermission(el, binding, type) {
    // 当前元素所需权限
    const { value } = binding
    if (value && value instanceof Array && value.length) {
        let hasPermission
        if (type) {
            // 如有一个元素未满足条件 返回false 剩余元素不会继续检测 如元素都满足条件 返回true
            hasPermission = value.every(item => {
                return store.state.app.permissions.includes(item)
            })
        } else {
            // 如有一个元素满足条件 返回true 剩余元素不会继续检测 如元素都不满足条件 返回false
            hasPermission = value.some(item => {
                return store.state.app.permissions.includes(item)
            })
        }
        if (!hasPermission) {
            el.parentNode.removeChild(el)
        }
    }
}

const permission = function(type) {
    return {
        inserted(el, binding) {
            checkPermission(el, binding, type)
        },
        update(el, binding) {
            checkPermission(el, binding, type)
        }
    }
}

Vue.directive('permission-or', permission(0))
Vue.directive('permission-and', permission(1))
