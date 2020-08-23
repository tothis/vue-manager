<template>
    <el-scrollbar
            ref="scrollContainer"
            :vertical="false"
            class="scroll-container"
            @wheel.native.prevent="handleScroll"
    >
        <slot/>
    </el-scrollbar>
</template>
<script>
    // 标签和标签间距
    const tagAndTagSpacing = 4

    export default {
        name: 'scroll-pane',
        data() {
            return {
                left: 0
            }
        },
        computed: {
            scrollWrapper() {
                return this.$refs.scrollContainer.$refs.wrap
            }
        },
        mounted() {
            this.scrollWrapper.addEventListener('scroll', this.emitScroll, true)
        },
        beforeDestroy() {
            this.scrollWrapper.removeEventListener('scroll', this.emitScroll)
        },
        methods: {
            handleScroll(e) {
                const eventDelta = e.wheelDelta || -e.deltaY * 40
                const $scrollWrapper = this.scrollWrapper
                $scrollWrapper.scrollLeft = $scrollWrapper.scrollLeft + eventDelta / 4
            },
            emitScroll() {
                this.$emit('scroll')
            },
            moveToTarget(currentTag) {
                const container = this.$refs.scrollContainer.$el
                const containerWidth = container.offsetWidth
                const scrollWrapper = this.scrollWrapper
                const tags = this.$parent.$refs.tag

                let firstTag = null
                let lastTag = null

                // 查找第一个标签和最后一个标签
                if (tags.length > 0) {
                    firstTag = tags[0]
                    lastTag = tags[tags.length - 1]
                }

                if (firstTag === currentTag) {
                    scrollWrapper.scrollLeft = 0
                } else if (lastTag === currentTag) {
                    scrollWrapper.scrollLeft = scrollWrapper.scrollWidth - containerWidth
                } else {
                    // 找到preTag和nextTag
                    const currentIndex = tags.findIndex(item => item === currentTag)
                    const prevTag = tags[currentIndex - 1]
                    const nextTag = tags[currentIndex + 1]

                    // 标签在nextTag之后的offsetLeft
                    const afterNextTagOffsetLeft = nextTag.$el.offsetLeft
                        + nextTag.$el.offsetWidth + tagAndTagSpacing

                    // 标签在prevTag之前的offsetLeft
                    const beforePrevTagOffsetLeft = prevTag.$el.offsetLeft - tagAndTagSpacing

                    if (afterNextTagOffsetLeft > scrollWrapper.scrollLeft + containerWidth) {
                        scrollWrapper.scrollLeft = afterNextTagOffsetLeft - containerWidth
                    } else if (beforePrevTagOffsetLeft < scrollWrapper.scrollLeft) {
                        scrollWrapper.scrollLeft = beforePrevTagOffsetLeft
                    }
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    .scroll-container {
        white-space: nowrap;
        position: relative;
        overflow: hidden;
        width: 100%;

        ::v-deep {
            .el-scrollbar__bar {
                bottom: 0px;
            }

            .el-scrollbar__wrap {
                height: 49px;
            }
        }
    }
</style>
