<template>
    <div class="sidebar-container">
        <logo :collapse="isCollapse"/>
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <el-menu
                    :active-text-color="variable.menuActiveText"
                    :background-color="variable.menuBg"
                    :collapse="isCollapse"
                    :collapse-transition="false"
                    :default-active="activeMenu"
                    :text-color="variable.menuText"
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
    import variable from '@/assets/css/global/variable.scss'

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
            variable() {
                return variable
            },
            isCollapse() {
                return !this.sidebar.isOpen
            }
        }
    }
</script>
<style lang="scss">
    @import '~@/assets/css/global/variable';

    .sidebar-container {
        position: fixed;
        width: $sideBarWidth !important;
        height: 100%;
        transition: width .28s;
        background-color: $menuBg;
        font-size: 0;
        top: 0;
        bottom: 0;
        left: 0;
        z-index: 1001;
        overflow: hidden;

        // 覆盖 element ui 样式
        .horizontal-collapse-transition {
            transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
        }

        .scrollbar-wrapper {
            overflow-x: hidden !important;
        }

        .el-scrollbar__bar.is-vertical {
            right: 0px;
        }

        .el-scrollbar {
            height: calc(100% - 50px);
        }

        .is-horizontal {
            display: none;
        }

        a {
            display: inline-block;
            width: 100%;
            overflow: hidden;
        }

        .svg-icon {
            margin-right: 16px;
        }

        .el-menu {
            border: none;
            height: 100%;
            width: 100% !important;
        }

        // 菜单悬浮
        .submenu-title-noDropdown,
        .el-submenu__title {
            &:hover {
                background-color: $menuHover !important;
            }
        }

        .is-active > .el-submenu__title {
            color: $subMenuActiveText !important;
        }

        & .nest-menu .el-submenu > .el-submenu__title,
        & .el-submenu .el-menu-item {
            min-width: $sideBarWidth !important;
            background-color: $subMenuBg !important;

            &:hover {
                background-color: $subMenuHover !important;
            }
        }
    }

    .hideSidebar {
        .sidebar-container {
            width: $sideBarCloseWidth !important;
        }

        .submenu-title-noDropdown {
            padding: 0 !important;
            position: relative;

            .el-tooltip {
                padding: 0 !important;

                .svg-icon {
                    margin-left: 20px;
                }
            }
        }

        .el-submenu {
            overflow: hidden;

            & > .el-submenu__title {
                padding: 0 !important;

                .svg-icon {
                    margin-left: 20px;
                }

                .el-submenu__icon-arrow {
                    display: none;
                }
            }
        }

        .el-menu--collapse {
            .el-submenu {
                & > .el-submenu__title {
                    & > span {
                        height: 0;
                        width: 0;
                        overflow: hidden;
                        visibility: hidden;
                        display: inline-block;
                    }
                }
            }
        }
    }

    .el-menu--collapse .el-menu .el-submenu {
        min-width: $sideBarWidth !important;
    }

    // 移动端响应
    .mobile {
        .main-container {
            margin-left: 0;
        }

        .sidebar-container {
            transition: transform .28s;
            width: $sideBarWidth !important;
        }

        &.hideSidebar {
            .sidebar-container {
                pointer-events: none;
                transition-duration: 0.3s;
                transform: translate3d(-$sideBarWidth, 0, 0);
            }
        }
    }

    .withoutAnimation {
        .main-container,
        .sidebar-container {
            transition: none;
        }
    }

    // 菜单折叠
    .el-menu--vertical {
        & > .el-menu {
            .svg-icon {
                margin-right: 16px;
            }
        }

        .nest-menu .el-submenu > .el-submenu__title,
        .el-menu-item {
            &:hover {
                background-color: $menuHover !important;
            }
        }

        // 当subMenu太长时 出现滚动条
        > .el-menu--popup {
            max-height: 100vh;
            overflow-y: auto;

            &::-webkit-scrollbar-track-piece {
                background: #d3dce6;
            }

            &::-webkit-scrollbar {
                width: 6px;
            }

            &::-webkit-scrollbar-thumb {
                background: #99a9bf;
                border-radius: 20px;
            }
        }
    }
</style>