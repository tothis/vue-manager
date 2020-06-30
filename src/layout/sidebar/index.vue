<template>
    <div class="has-logo">
        <logo :collapse="isCollapse"/>
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <el-menu
                    :active-text-color="variables.menuActiveText"
                    :background-color="variables.menuBg"
                    :collapse="isCollapse"
                    :collapse-transition="false"
                    :default-active="activeMenu"
                    :text-color="variables.menuText"
                    :unique-opened="false"
                    mode="vertical"
            >
                <sidebar-item
                        :base-path="route.path"
                        v-for="(route, index) in routes"
                        :item="route"
                        :key="index"
                />
            </el-menu>
        </el-scrollbar>
    </div>
</template>
<script>
    import Logo from './logo'
    import SidebarItem from './sidebarItem'
    import variables from '@/assets/css/global/variable.scss'

    export default {
        components: { SidebarItem, Logo },
        computed: {
            sidebar() {
                return this.$store.state.app.sidebar
            },
            routes() {
                // computed无法监控到router路由的动态添加
                // return this.$router.options.routes
                return this.$store.state.app.routes
            },
            activeMenu() {
                const route = this.$route
                const { meta, path } = route
                if (meta.activeMenu) {
                    return meta.activeMenu
                }
                return path
            },
            variables() {
                return variables
            },
            isCollapse() {
                return !this.sidebar.isOpen
            }
        }
    }
</script>