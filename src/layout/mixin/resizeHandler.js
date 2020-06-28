import store from '@/store'

const { body } = document
const width = 992

export default {
    watch: {
        $route(route) {
            if (this.device === 'mobile' && this.sidebar.opened) {
                store.dispatch('app/closeSideBar', { withoutAnimation: false })
            }
        }
    },
    beforeMount() {
        window.addEventListener('resize', this.resizeHandler)
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.resizeHandler)
    },
    mounted() {
        const isMobile = this.isMobile()
        if (isMobile) {
            store.dispatch('app/setDevice', 'mobile')
            store.dispatch('app/closeSideBar', { withoutAnimation: true })
        }
    },
    methods: {
        isMobile() {
            const rect = body.getBoundingClientRect()
            return rect.width - 1 < width
        },
        resizeHandler() {
            if (!document.hidden) {
                const isMobile = this.isMobile()
                store.dispatch('app/setDevice', isMobile ? 'mobile' : 'desktop')
                if (isMobile) {
                    store.dispatch('app/closeSideBar', { withoutAnimation: true })
                }
            }
        }
    }
}