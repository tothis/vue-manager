<template>
    <el-table
            :data="tableData">
        <el-table-column
                prop="id"
                label="id">
        </el-table-column>
        <el-table-column
                prop="name"
                label="姓名">
        </el-table-column>
        <el-table-column
                prop="sex"
                label="性别">
        </el-table-column>
        <el-table-column
                prop="age"
                label="年龄">
        </el-table-column>
        <el-table-column
                prop="date"
                label="日期">
        </el-table-column>
    </el-table>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'user',
        data() {
            return {
                tableData: []
            }
        },
        mounted() {
            axios({
                url: '/user',
                method: 'get'
            }).then(result => {
                this.tableData = result.data.users
            })
        }
    }
</script>