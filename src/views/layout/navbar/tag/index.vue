<template>
    <div id="tag-container" class="tag-container">
        <scroll-pane ref="scrollPane" class="tag-wrapper" @scroll="handleScroll">
            <router-link
                    v-for="tag in visitedView"
                    ref="tag"
                    :key="tag.path"
                    :class="isActive(tag) ? 'active' : ''"
                    :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
                    tag="span"
                    class="tag-item"
                    @click.middle.native="!isAffix(tag) ? closeSelectedTag(tag) : ''"
                    @contextmenu.prevent.native="openMenu(tag, $event)"
            >
                {{ tag.title }}
                <span v-if="!isAffix(tag)" class="el-icon-close"
                      @click.prevent.stop="closeSelectedTag(tag)"/>
            </router-link>
        </scroll-pane>
        <ul v-show="visible" :style="{left : left + 'px', top : top + 'px'}" class="menu">
            <li @click="refreshSelectedTag(selectedTag)">刷新</li>
            <li v-if="!isAffix(selectedTag)"
                @click="closeSelectedTag(selectedTag)">
                关闭
            </li>
            <li @click="closeOthersTags">关闭其它</li>
            <li @click="closeAllTags(selectedTag)">关闭所有</li>
        </ul>
    </div>
</template>
<script>
    import ScrollPane from './scroll-pane'
    import path from 'path'

    export default {
        components: { ScrollPane },
        data() {
            return {
                visible: false,
                top: 0,
                left: 0,
                selectedTag: {},
                affixTags: []
            }
        },
        computed: {
            visitedView() {
                return this.$store.state['sidebar-label'].visitedView
            },
            routes() {
                return this.$store.state.app.routes
            }
        },
        watch: {
            $route() {
                this.addTags()
                this.moveToCurrentTag()
            },
            visible(value) {
                if (value) {
                    document.body.addEventListener('click', this.closeMenu)
                } else {
                    document.body.removeEventListener('click', this.closeMenu)
                }
            }
        },
        mounted() {
            // 加载标签
            this.affixTags = this.filterAffixTags(this.routes)
            for (const tag of this.affixTags) {
                // 必须有标签名称
                if (tag.name) {
                    this.$store.dispatch('sidebar-label/addVisitedView', tag)
                }
            }
            this.addTags()
        },
        methods: {
            isActive(route) {
                return route.path === this.$route.path
            },
            isAffix(tag) {
                return tag.meta && tag.meta.affix
            },
            filterAffixTags(routes, basePath = '/') {
                let tags = []
                routes.forEach(route => {
                    if (route.meta && route.meta.affix) {
                        const tagPath = path.resolve(basePath, route.path)
                        tags.push({
                            fullPath: tagPath,
                            path: tagPath,
                            name: route.name,
                            meta: { ...route.meta }
                        })
                    }
                    if (route.children) {
                        const tempTags = this.filterAffixTags(route.children, route.path)
                        if (tempTags.length >= 1) {
                            tags = [...tags, ...tempTags]
                        }
                    }
                })
                return tags
            },
            addTags() {
                const { name } = this.$route
                if (name) {
                    this.$store.dispatch('sidebar-label/addView', this.$route)
                }
                return false
            },
            moveToCurrentTag() {
                const tags = this.$refs.tag
                this.$nextTick(() => {
                    for (const tag of tags) {
                        if (tag.to.path === this.$route.path) {
                            this.$refs.scrollPane.moveToTarget(tag)
                            // 不同则更新
                            if (tag.to.fullPath !== this.$route.fullPath) {
                                this.$store.dispatch('sidebar-label/updateVisitedView'
                                    , this.$route)
                            }
                            break
                        }
                    }
                })
            },
            refreshSelectedTag(view) {
                this.$store.dispatch('sidebar-label/delCachedView', view)
                    .then(() => {
                        const { fullPath } = view
                        this.$nextTick(() => {
                            this.$router.replace({
                                path: '/redirect' + fullPath
                            })
                        })
                    })
            },
            closeSelectedTag(view) {
                this.$store.dispatch('sidebar-label/delView', view)
                    .then(({ visitedView }) => {
                        if (this.isActive(view)) {
                            this.toLastView(visitedView, view)
                        }
                    })
            },
            closeOthersTags() {
                this.$router.push(this.selectedTag)
                this.$store.dispatch('sidebar-label/delOtherView', this.selectedTag)
                    .then(() => {
                        this.moveToCurrentTag()
                    })
            },
            closeAllTags(view) {
                this.$store.dispatch('sidebar-label/delAllView')
                    .then(({ visitedView }) => {
                        if (this.affixTags.some(tag => tag.path === view.path)) {
                            return
                        }
                        this.toLastView(visitedView, view)
                    })
            },
            toLastView(visitedView, view) {
                const latestView = visitedView.slice(-1)[0]
                if (latestView) {
                    this.$router.push(latestView.fullPath)
                } else {
                    // 默认无标签视图 则重定向到主页
                    if (view.name === 'dashboard') {
                        this.$router.replace({ path: '/redirect' + view.fullPath })
                    } else {
                        this.$router.push('/')
                    }
                }
            },
            openMenu(tag, e) {
                const menuMinWidth = 105
                // container margin left
                const offsetLeft = this.$el.getBoundingClientRect().left
                // container width
                const offsetWidth = this.$el.offsetWidth
                // left boundary
                const maxLeft = offsetWidth - menuMinWidth
                // 往右偏移15px
                const left = e.clientX - offsetLeft + 15

                if (left > maxLeft) {
                    this.left = maxLeft
                } else {
                    this.left = left
                }

                this.top = e.clientY
                this.visible = true
                this.selectedTag = tag
            },
            closeMenu() {
                this.visible = false
            },
            handleScroll() {
                this.closeMenu()
            }
        }
    }
</script>
<style lang="scss" scoped>
    .tag-container {
        background-color: #fff;
        border: 1px dashed #e4e4e4;

        .tag-wrapper {
            .tag-item {
                display: inline-block;
                cursor: pointer;
                line-height: 26px;
                border: 1px solid #d8dce5;
                border-radius: 4px;
                padding: 0 8px;
                font-size: 12px;
                margin-left: 5px;
                margin-top: 4px;

                &.active {
                    background-color: #42b983;
                    color: #fff;
                    border-color: #42b983;

                    &::before {
                        content: '';
                        background: #fff;
                        display: inline-block;
                        width: 8px;
                        height: 8px;
                        border-radius: 50%;
                        position: relative;
                        margin-right: 2px;
                    }
                }
            }
        }

        .menu {
            margin-top: 0;
            background: #fff;
            z-index: 1;
            position: absolute;
            border-radius: 4px;
            font-size: 12px;
            box-shadow: 2px 2px 4px rgba(0, 0, 0, .2);

            li {
                padding: 6px 16px;
                cursor: pointer;

                &:hover {
                    background-color: #eee;
                }
            }
        }
    }
</style>
<style lang="scss">
    // 重置element el-icon-close样式
    .tag-wrapper {
        .tag-item {
            .el-icon-close {
                border-radius: 50%;
                width: 14px;
                height: 14px;
                vertical-align: 2px;
                text-align: center;

                &:before {
                    vertical-align: -8%;
                }

                &:hover {
                    background-color: #b4bccc;
                }
            }
        }
    }
</style>
