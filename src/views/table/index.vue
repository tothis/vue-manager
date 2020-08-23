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
    import { list } from '@/api/user'

    export default {
        name: 'i-table',
        created() {
            console.log('加载table')
        },
        data() {
            return {
                tableData: []
            }
        },
        mounted() {
            list().then(result => {
                this.tableData = result.users
            })
        }
    }
</script>
