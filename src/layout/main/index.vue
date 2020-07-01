<!-- 右侧内容 -->
<template>
    <section class="app-main">
        <transition mode="out-in" name="fade-transform">
            <router-view :key="key"/>
        </transition>
    </section>
</template>
<script>
    export default {
        name: 'app-main',
        computed: {
            key() {
                return this.$route.path
            }
        }
    }
</script>
<style scoped>
    .app-main {
        width: 100%;
        height: calc(100% - 4px);
        position: relative;
        overflow: hidden;
    }

    .fixed-header + .app-main {
        padding-top: 50px;
    }
</style>
<style lang="scss">
    .el-popup-parent--hidden {
        .fixed-header {
            padding-right: 15px;
        }
    }
</style>