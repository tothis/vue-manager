<template>
    <div class="navbar">
        <div @click="toggleSideBar" class="hamburger-container">
            <svg
                    :class="{'is-open':sidebar.isOpen}"
                    class="hamburger"
                    height="64"
                    viewBox="0 0 1024 1024"
                    width="64"
                    xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 0 0 0-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0 0 14.4 7z"/>
            </svg>
        </div>
        <breadcrumb class="breadcrumb-container"/>

        <div class="right-menu">
            <el-dropdown class="avatar-container" trigger="click">
                <div class="avatar-wrapper">
                    <img :src="avatar" class="user-avatar">
                    <i class="el-icon-caret-bottom"/>
                </div>
                <el-dropdown-menu class="user-dropdown" slot="dropdown">
                    <router-link to="/">
                        <el-dropdown-item>
                            页面1
                        </el-dropdown-item>
                    </router-link>
                    <router-link to="/">
                        <el-dropdown-item>
                            页面2
                        </el-dropdown-item>
                    </router-link>
                    <el-dropdown-item @click.native="exit" divided>
                        <span style="display:block;">登出</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script>
    import Breadcrumb from '@/components/breadcrumb'
    import { getInfo } from '@/api/user'
    import { removeToken } from '@/util/auth'

    export default {
        components: {
            Breadcrumb
        },
        computed: {
            sidebar() {
                return this.$store.state.app.sidebar
            },
            avatar() {
                return getInfo().avatar
            }
        },
        methods: {
            toggleSideBar() {
                this.$store.dispatch('app/toggleSideBar')
            }
            , exit() {
                removeToken()
                this.$router.push(`/login?redirect=${this.$route.fullPath}`)
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import '~@/assets/css/global/variable';

    .navbar {
        height: $navbarHeight;
        background: #fff;
        box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

        .hamburger-container {
            line-height: 46px;
            height: 100%;
            float: left;
            cursor: pointer;
            transition: background .3s;
            -webkit-tap-highlight-color: transparent;
            padding: 0 15px;

            &:hover {
                background: rgba(0, 0, 0, .025)
            }
        }

        .breadcrumb-container {
            float: left;
        }

        .right-menu {
            float: right;
            height: 100%;
            line-height: 50px;

            &:focus {
                outline: none;
            }

            .right-menu-item {
                display: inline-block;
                padding: 0 8px;
                height: 100%;
                font-size: 18px;
                color: #5a5e66;
                vertical-align: text-bottom;

                &.hover-effect {
                    cursor: pointer;
                    transition: background .3s;

                    &:hover {
                        background: rgba(0, 0, 0, .025)
                    }
                }
            }

            .avatar-container {
                margin-right: 30px;

                .avatar-wrapper {
                    margin-top: 5px;
                    position: relative;

                    .user-avatar {
                        cursor: pointer;
                        width: 40px;
                        height: 40px;
                        border-radius: 10px;
                    }

                    .el-icon-caret-bottom {
                        cursor: pointer;
                        position: absolute;
                        right: -20px;
                        top: 25px;
                        font-size: 12px;
                    }
                }
            }
        }

        .hamburger {
            display: inline-block;
            vertical-align: middle;
            width: 20px;
            height: 20px;
        }

        .hamburger.is-open {
            transform: rotate(180deg);
        }
    }
</style>