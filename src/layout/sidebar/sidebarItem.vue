<template>
    <div v-if="!item.hidden">
        <template
                v-if="hasOneShowingChild(item.children,item)
                    && (!onlyOneChild.children || onlyOneChild.noShowingChildren)
                    && !item.alwaysShow"
        >
            <app-link :to="resolvePath(onlyOneChild.path)" v-if="onlyOneChild.meta">
                <el-menu-item
                        :class="{'submenu-title-noDropdown' : !isNest}"
                        :index="resolvePath(onlyOneChild.path)"
                >
                    <item
                            :icon="onlyOneChild.meta.icon || (item.meta && item.meta.icon)"
                            :title="onlyOneChild.meta.label"
                    />
                </el-menu-item>
            </app-link>
        </template>

        <el-submenu :index="resolvePath(item.path)" popper-append-to-body ref="subMenu" v-else>
            <template slot="title">
                <item :icon="item.meta && item.meta.icon" :title="item.meta.label" v-if="item.meta"/>
            </template>
            <sidebar-item
                    :base-path="resolvePath(child.path)"
                    :is-nest="true"
                    :item="child"
                    :key="child.path"
                    class="nest-menu"
                    v-for="child in item.children"
            />
        </el-submenu>
    </div>
</template>

<script>
    import path from 'path'
    import { isExternal } from '@/util/validate'
    import Item from './item'
    import AppLink from './link'
    import FixIosBug from './fixIosBug'

    export default {
        name: 'sidebarItem',
        components: { Item, AppLink },
        mixins: [FixIosBug],
        props: {
            item: {
                type: Object,
                required: true
            },
            isNest: {
                type: Boolean,
                default: false
            },
            basePath: {
                type: String,
                default: ''
            }
        },
        data() {
            this.onlyOneChild = null
            return {}
        },
        methods: {
            hasOneShowingChild(children = [], parent) {
                const showingChildren = children.filter(item => {
                    if (item.hidden) {
                        return false
                    } else {
                        this.onlyOneChild = item
                        return true
                    }
                })

                if (showingChildren.length === 1) {
                    return true
                }

                if (showingChildren.length === 0) {
                    this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
                    return true
                }

                return false
            },
            resolvePath(routePath) {
                if (isExternal(routePath)) {
                    return routePath
                }
                if (isExternal(this.basePath)) {
                    return this.basePath
                }
                return path.resolve(this.basePath, routePath)
            }
        }
    }
</script>