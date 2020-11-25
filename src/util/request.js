import axios from 'axios'
import { Message } from 'element-ui'
import { token, TOKEN_KEY } from '@/util/auth'

const request = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 5000
})

// 请求拦截器
request.interceptors.request.use(
    config => {
        config.headers[TOKEN_KEY] = token()
        return config
    }, error => {
        console.log(error)
        return Promise.reject(error)
    }
)

// 响应拦截器
request.interceptors.response.use(
    response => {
        const data = response.data
        // 业务错误
        if (data.code !== 0) {
            Message({
                message: '错误 ' + JSON.stringify(data),
                type: 'error',
                duration: 5 * 1000
            })
            return Promise.reject(data)
        }
        return data.data
    },
    error => {
        console.error(error)
        Message({
            message: '响应错误 ' + JSON.stringify(error),
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)
export default request