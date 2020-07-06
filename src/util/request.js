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
        // 请求成功
        if (response.status === 200) {
            return data
        } else {
            Message({
                message: data || 'error',
                type: 'error',
                duration: 5 * 1000
            })
            return Promise.reject(data)
        }
    },
    error => {
        console.error(error)
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)
export default request