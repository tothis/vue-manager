<template>
    <div :class="classObj" class="app-wrapper">
        <div
                @click="handleClickOutside"
                class="drawer-bg"
                v-if="device ==='mobile' && sidebar.isOpen"
        />
        <sidebar class="sidebar-container"/>
        <div class="main-container">
            <div class="fixed-header">
                <navbar/>
            </div>
            <app-main/>
        </div>
    </div>
</template>
<script>
    import Navbar from './navbar'
    import Sidebar from './sidebar'
    import AppMain from './main'
    import ResizeMixin from './mixin/resizeHandler'

    export default {
        name: 'layout',
        components: {
            Navbar,
            Sidebar,
            AppMain
        },
        mixins: [ResizeMixin],
        computed: {
            sidebar() {
                return this.$store.state.app.sidebar
            },
            device() {
                return this.$store.state.app.device
            },
            classObj() {
                return {
                    hideSidebar: !this.sidebar.isOpen,
                    openSidebar: this.sidebar.isOpen,
                    withoutAnimation: this.sidebar.withoutAnimation,
                    mobile: this.device === 'mobile'
                }
            }
        },
        methods: {
            handleClickOutside() {
                this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import '~@/assets/css/global/mixin';
    @import '~@/assets/css/global/variable';

    .app-wrapper {
        @include clearfix;
        position: relative;
        height: 100%;
        width: 100%;

        &.mobile.openSidebar {
            position: fixed;
            top: 0;
        }
    }

    .drawer-bg {
        background: #000;
        opacity: 0.3;
        width: 100%;
        top: 0;
        height: 100%;
        position: absolute;
        z-index: 999;
    }

    .fixed-header {
        position: fixed;
        top: 0;
        right: 0;
        z-index: 9;
        width: calc(100% - #{$sideBarWidth});
        transition: width 0.28s;
    }

    .hideSidebar .fixed-header {
        width: calc(100% - 54px)
    }

    .mobile .fixed-header {
        width: 100%;
    }
</style>