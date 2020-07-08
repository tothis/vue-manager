<template>
    <div :class="classObj" class="app-wrapper">
        <div
                @click="closeSideBar"
                class="drawer-bg"
                v-if="device === 'mobile' && sidebar.isOpen"
        />
        <sidebar/>
        <div class="main-container">
            <navbar/>
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
                    mobile: this.device === 'mobile'
                }
            }
        },
        methods: {
            closeSideBar() {
                this.$store.dispatch('app/closeSideBar')
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import '~@/assets/css/global/variable';

    .app-wrapper {
        position: relative;
        height: 100%;
        width: 100%;

        .main-container {
            position: relative;
            height: 100%;
            transition: margin-left .28s;
            margin-left: $sideBarWidth;
        }

        // 左侧栏关闭
        &.hideSidebar {
            > .main-container {
                margin-left: #{$sideBarCloseWidth};
            }
        }

        // 移动端样式
        &.mobile {
            // 移动端左侧栏展开右侧遮罩
            .drawer-bg {
                background: #000;
                opacity: 0.3;
                width: 100%;
                top: 0;
                height: 100%;
                position: absolute;
                z-index: 1;
            }

            .main-container {
                margin-left: 0;
            }
        }
    }
</style>
