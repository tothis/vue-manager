import Vue from 'vue'

/**
 * 节流函数 单位时间内只可点击一次
 */
Vue.directive('prevent-re-click', {
    inserted(el, binding) {
        el.addEventListener('click', () => {
            if (!el.disabled) {
                el.disabled = true
                setTimeout(() => {
                    el.disabled = false
                }, binding.value || 2000)
            }
        })
    }
})