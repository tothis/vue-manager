import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/util/auth'

const request = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 5000
})

// 请求拦截器
request.interceptors.request.use(
    config => {
        if (store.getters.token) {
            config.headers['X-Token'] = getToken()
        }
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
        if (response.status !== 200) {
            Message({
                message: data || 'error',
                type: 'error',
                duration: 5 * 1000
            })
            return Promise.reject(new Error(data.message || 'Error'))
        } else {
            console.log(response.headers['authorization'], 'authorization')
            return data
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