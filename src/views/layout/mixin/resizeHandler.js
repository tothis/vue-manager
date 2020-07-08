import store from '@/store'

const { body } = document
const width = 992

export default {
    watch: {
        '$route.path': function() {
            if (this.device === 'mobile' && this.sidebar.isOpen) {
                store.dispatch('app/closeSideBar')
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
        if (this.isMobile()) {
            store.dispatch('app/setDevice', 'mobile')
            store.dispatch('app/closeSideBar')
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
                    store.dispatch('app/closeSideBar')
                }
            }
        }
    }
}
