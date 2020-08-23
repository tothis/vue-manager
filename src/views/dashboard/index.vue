<template>
    <div class="dashboard-container">
        <div class="left">
            <el-row :gutter="2">
                <el-col :span="6">
                    <el-card class="box-card">
                        <p>内容</p>
                    </el-card>
                </el-col>
                <el-col :span="6">
                    <el-card class="box-card">
                        <p>内容</p>
                    </el-card>
                </el-col>
                <el-col :span="6">
                    <el-card class="box-card">
                        <p>内容</p>
                    </el-card>
                </el-col>
                <el-col :span="6">
                    <el-card class="box-card">
                        <p>内容</p>
                    </el-card>
                </el-col>
            </el-row>
        </div>
        <div class="right">
            <p>个人信息</p>
            <!-- 且关系 -->
            <h3 v-permission-and="['root','staff']">name -> {{ name }}</h3>
            <!-- 或关系 -->
            <h3 v-permission-or="['root','xx']">name -> {{ name }}</h3>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'dashboard',
        created() {
            console.log('加载dashboard')
        },
        computed: {
            name() {
                return '管理员'
            }
        }
    }
</script>
<style lang="scss" scoped>
    .dashboard-container {
        display: flex;
        height: 100%;
        text-align: center;

        .left, .right {
            height: calc(100% - 8px);
            padding: 4px;
            background-color: #f8f8f8;
        }

        .left {
            width: 74%;
        }

        .right {
            width: 26%;
        }
    }
</style>
