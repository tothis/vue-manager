<!-- 面包屑 -->
<template>
    <el-breadcrumb class="app-breadcrumb" separator="/">
        <transition-group name="breadcrumb">
            <el-breadcrumb-item
                    :key="index"
                    v-for="(item, index) in routes"
            >
                <span v-if="index === routes.length - 1"
                      class="no-redirect">
                    {{ item.meta.label }}
                </span>
                <a v-else @click.prevent="jumpPage(item)">
                    {{ item.meta.label }}
                </a>
            </el-breadcrumb-item>
        </transition-group>
    </el-breadcrumb>
</template>
<script>

    export default {
        data() {
            return {
                routes: null
            }
        },
        watch: {
            $route() {
                this.getBreadcrumb()
            }
        },
        created() {
            this.getBreadcrumb()
        },
        methods: {
            getBreadcrumb() {
                // 仅显示'meta.label'有值的路由
                this.routes = this.$route.matched.filter(item => item.meta.title)
                const first = this.routes[0]
                // 非仪表盘页添加仪表盘路由
                if (!first.name || first.name !== 'dashboard') {
                    this.routes.unshift({ path: '/', name: 'index', meta: { label: '仪表盘' } })
                }
            },
            // 跳转页面
            jumpPage(item) {
                const { redirect, path } = item
                if (redirect) {
                    this.$router.push(redirect)
                } else {
                    this.$router.push(path)
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    .app-breadcrumb.el-breadcrumb {
        display: inline-block;
        font-size: 14px;
        line-height: 50px;
        margin-left: 8px;

        .no-redirect {
            color: #97a8be;
            cursor: text;
        }
    }
</style>