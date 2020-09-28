<template>
    <div>
        <el-button type="primary" @click="openForm({$type: true})">新增字典类型</el-button>

        <el-table
                :data="tableData"
                :row-key="e => e.id.toString() + e.name"
        >
            <el-table-column prop="name" label="类型"/>
            <el-table-column prop="label" label="label"/>
            <el-table-column prop="value" label="value"/>
            <el-table-column>
                <template slot-scope="scope">
                    <el-button type="primary" @click="openForm({...scope.row, $type: scope.row.name})">编辑</el-button>
                    <el-button
                            type="danger"
                            @click="remove({$type: scope.row.name, id: scope.row.id})">
                        删除
                    </el-button>
                    <el-button
                            v-if="scope.row.name"
                            type="success"
                            @click="openForm({dictTypeId: scope.row.id})">
                        新增字典
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="保存字典" :visible.sync="visible">
            <el-form :model="saveData" ref="form" :rules="rules">
                <!-- prop表单校验使用 -->
                <el-form-item prop="name" v-show="saveData.$type">
                    <el-input placeholder="请输入字典名称" v-model.trim="saveData.name">
                        <template slot="prepend">字典名称</template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="label" v-show="!saveData.$type">
                    <el-input placeholder="请输入字典label" v-model.trim="saveData.label">
                        <template slot="prepend">label</template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="value" v-show="!saveData.$type">
                    <el-input placeholder="请输入字典value" v-model.trim="saveData.value">
                        <template slot="prepend">value</template>
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="visible = false">取 消</el-button>
                <el-button type="primary" @click="save">保 存</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import { list, remove, removeType, save, saveType } from '@/api/dict'

    export default {
        name: 'i-dict',
        data() {
            let validateName = (rule, value, callback) => {
                if (!this.saveData.$type || this.saveData.name) {
                    callback()
                } else {
                    callback(new Error('字典名称必填'))
                    console.log('字典名称必填')
                }
            }
            let validateLabel = (rule, value, callback) => {
                if (this.saveData.$type || this.saveData.label) {
                    callback()
                } else {
                    callback(new Error('字典label必填'))
                    console.log('字典label必填')
                }
            }
            let validateValue = (rule, value, callback) => {
                if (this.saveData.$type || this.saveData.value) {
                    callback()
                } else {
                    callback(new Error('字典value必填'))
                    console.log('字典value必填')
                }
            }
            return {
                tableData: [],
                saveData: {},
                visible: false,
                rules: {
                    name: [{ validator: validateName }],
                    label: [{ validator: validateLabel }],
                    value: [{ validator: validateValue }]
                }
            }
        },
        mounted() {
            this.list()
        },
        methods: {
            async list() {
                let data = (await list()).data
                // 为子节点设置dictTypeId
                for (let dict of data) {
                    if (dict.children) {
                        for (let i = 0; i < dict.children.length; i++) {
                            dict.children[i].dictTypeId = dict.id
                        }
                    }
                }
                this.tableData = data
            },
            openForm(e) {
                this.saveData = e
                this.visible = true
            },
            async save() {
                this.$refs.form.validate(async valid => {
                    if (!valid) {
                        return false
                    }

                    let e = this.saveData
                    // 保存字典类型
                    if (e.$type) {
                        await saveType({ id: e.id, name: e.name })
                    }
                    // 保存字典
                    else {
                        await save({ id: e.id, dictTypeId: e.dictTypeId, label: e.label, value: e.value })
                    }
                    this.visible = false
                    await this.list()
                })
            },
            async remove(e) {
                this.$confirm('确认删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    e.$type ? await removeType(e.id) : await remove(e.id)
                    await this.list()
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
            }
        }
    }
</script>