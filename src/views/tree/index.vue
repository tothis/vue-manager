<template>
    <div class="app-container">
        <el-input placeholder="Filter keyword" v-model="filterText"/>
        <el-tree
                :data="data2"
                :filter-node-method="filterNode"
                :props="defaultProps"
                class="filter-tree"
                default-expand-all
                ref="tree2"
        />
    </div>
</template>

<script>
    export default {

        data() {
            return {
                filterText: '',
                data2: [{
                    id: 1,
                    label: '节点 one 1',
                    children: [{
                        id: 4,
                        label: '节点 two 1-1',
                        children: [{
                            id: 9,
                            label: '节点 three 1-1-1'
                        }, {
                            id: 10,
                            label: '节点 three 1-1-2'
                        }]
                    }]
                }, {
                    id: 2,
                    label: '节点 one 2',
                    children: [{
                        id: 5,
                        label: '节点 two 2-1'
                    }, {
                        id: 6,
                        label: '节点 two 2-2'
                    }]
                }, {
                    id: 3,
                    label: '节点 one 3',
                    children: [{
                        id: 7,
                        label: '节点 two 3-1'
                    }, {
                        id: 8,
                        label: '节点 two 3-2'
                    }]
                }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
            }
        },
        watch: {
            filterText(val) {
                this.$refs.tree2.filter(val)
            }
        },

        methods: {
            filterNode(value, data) {
                if (!value) return true
                return data.label.indexOf(value) !== -1
            }
        }
    }
</script>
<style lang="scss" scoped>
    .app-container {
        .el-input {
            margin-bottom: 20px;
        }
    }
</style>
