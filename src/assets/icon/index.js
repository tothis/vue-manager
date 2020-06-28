import Vue from 'vue'
import SvgIcon from '@/components/icon'

Vue.component('svg-icon', SvgIcon)

const requireAll = requireContext => requireContext.keys().map(requireContext)
// 指定svg文件
const r = require.context('./', false, /.svg$/)
console.log(r, 'svg file')
requireAll(r)