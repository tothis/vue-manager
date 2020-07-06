<template>
    <div :class="{'is-close':!isOpen}" class="sidebar-logo-container">
        <transition name="logo-transition">
            <router-link :key="isOpen?'expand':'collapse'" to="/" class="link">
                <img :src="logo" class="logo">
                <h1 class="title">{{ title }} </h1>
            </router-link>
        </transition>
    </div>
</template>
<script>
    export default {
        name: 'logo',
        props: {
            isOpen: {
                required: true
            }
        },
        data() {
            return {
                title: 'Vue Admin Template',
                logo: require('@/assets/image/logo.png')
            }
        }
    }
</script>
<style lang="scss" scoped>
    .logo-transition-enter-active {
        transition: opacity 1.5s;
    }

    .logo-transition-enter,
    .logo-transition-leave-to {
        opacity: 0;
    }

    .sidebar-logo-container {
        position: relative;
        width: 100%;
        height: 50px;
        line-height: 50px;
        background: #2b2f3a;
        text-align: center;
        overflow: hidden;

        .link {
            height: 100%;
            width: 100%;

            .logo {
                width: 32px;
                height: 32px;
                vertical-align: middle;
                margin-right: 12px;
                border: 1px solid wheat;
                border-radius: 50%;
            }

            .title {
                display: inline-block;
                margin: 0;
                color: #fff;
                font-weight: 600;
                line-height: 50px;
                font-size: 14px;
                font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
                vertical-align: middle;
            }
        }

        // 左侧栏关闭时
        &.is-close {
            .logo {
                margin-right: 0;
            }
        }
    }
</style>