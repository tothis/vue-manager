<script>
    export default {
        // 表示该组件为纯函数组件 会进行检查 只可用props 而不可用state
        functional: true,
        props: {
            icon: {
                type: String,
                default: ''
            },
            label: {
                type: String,
                default: ''
            }
        },
        render(h, context) {
            const { icon, label } = context.props
            const result = []

            if (icon) {
                result.push(<svg-icon icon-class={icon}/>)
            }
            if (label) {
                result.push(<span>{label}</span>)
            }
            return result
        }
    }
</script>