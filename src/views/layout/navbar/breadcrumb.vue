<!-- 面包屑 -->
<template>
    <el-breadcrumb separator="/">
        <transition-group name="breadcrumb">
            <el-breadcrumb-item
                    :key="item.path"
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
            $route(route) {
                // 如果重定向到页面 则不更新面包屑
                if (route.path.startsWith('/redirect')) {
                    return
                }
                this.getBreadcrumb()
            }
        },
        created() {
            this.getBreadcrumb()
        },
        methods: {
            getBreadcrumb() {
                // 仅显示'meta.title'有值的路由
                this.routes = this.$route.matched.filter(item => item.meta.title)
                const first = this.routes[0]
                // 非仪表盘页添加仪表盘路由
                if (!first.name || first.name !== 'dashboard') {
                    this.routes.unshift({ path: '/', meta: { label: '仪表盘' } })
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
    .el-breadcrumb {
        line-height: 50px;

        // 灰色链接
        .no-redirect {
            color: #97a8be;
            cursor: text;
        }
    }
</style>
