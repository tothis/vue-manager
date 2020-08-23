<script>
    export default {
        created() {
            const { params, query } = this.$route
            const { path } = params
            this.$router.replace({ path: '/' + path, query })
        },
        // 避免警告信息 template or render function not defined.
        render: function(h) {
            return h()
        }
    }
</script>
