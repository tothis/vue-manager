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
<style lang="scss" scoped>
    @import '~@/assets/css/global/variable';

    .app-main {
        height: calc(100% - #{$navbarHeight});
        overflow: hidden scroll;

        /* 滚动条宽高 */
        &::-webkit-scrollbar {
            width: 6px;
        }

        /* 滑块样式 */
        &::-webkit-scrollbar-thumb {
            border-radius: 10px;
            background: #838383;
        }

        /* 滑块轨道样式 */
        &::-webkit-scrollbar-track {
            border-radius: 10px;
            background: #ccc;
        }
    }
</style>