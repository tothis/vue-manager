<template>
    <div v-if="!item.hidden">
        <template v-if="loadNode(item)">
            <item-link :to="resolvePath(node.path)">
                <el-menu-item :index="resolvePath(node.path)">
                    <item-text :icon="node.meta.icon" :label="node.meta.label"/>
                </el-menu-item>
            </item-link>
        </template>
        <el-submenu
                v-else
                popper-append-to-body
                :index="resolvePath(item.path)"
                ref="subMenu"
        >
            <item-text slot="title" :icon="item.meta.icon" :label="item.meta.label"/>
            <item
                    :base-path="resolvePath(child.path)"
                    :item="child"
                    :key="child.path"
                    class="child-menu"
                    v-for="child in item.children"
            />
        </el-submenu>
    </div>
</template>
<script>
    import path from 'path'
    import { isExternal } from '@/util/validate'
    import ItemText from './text'
    import ItemLink from './link'
    import FixIosBug from './fixIosBug'

    export default {
        name: 'item',
        components: { ItemText, ItemLink },
        mixins: [FixIosBug],
        props: {
            item: {
                type: Object,
                required: true
            },
            basePath: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                node: null
            }
        },
        methods: {
            loadNode(node) {
                // 如果该节点仅有一个子节点 则显示该子节点 否则显示该节点
                if (node.children) {
                    // 过滤hidden的菜单
                    const nodes = node.children.filter(item => !item.hidden)
                    if (nodes.length === 1) {
                        this.node = nodes[0]
                    } else {
                        return false
                    }
                } else {
                    this.node = { ...node, path: '' }
                }
                return true
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