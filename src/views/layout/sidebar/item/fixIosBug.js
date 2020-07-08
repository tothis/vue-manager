export default {
    computed: {
        device() {
            return this.$store.state.app.device
        }
    },
    mounted() {
        const subMenu = this.$refs.subMenu
        if (subMenu) {
            const handleMouseleave = subMenu.handleMouseleave
            subMenu.handleMouseleave = e => {
                if (this.device === 'mobile') {
                    return
                }
                handleMouseleave(e)
            }
        }
    }
}
