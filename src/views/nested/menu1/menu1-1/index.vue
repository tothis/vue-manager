<template>
    <div style="padding:30px;">
        <el-alert :closable="false" title="menu 1-1" type="success">
            <router-view/>
        </el-alert>
    </div>
</template>
<script>
    export default {
        name: 'menu1-1'
    }
</script>
