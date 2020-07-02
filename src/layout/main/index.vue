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
    }
</style>