import request from '@/util/request'
import axios from 'axios'
import { setToken, token, TOKEN_KEY } from '@/util/auth'
import { Message } from 'element-ui'

export function login(data, call) {
    axios.post('/api/login', data, {
        headers: {
            TOKEN_KEY: token()
        }
    }).then(result => {
        // 登录成功
        setToken(result.headers[TOKEN_KEY])
        call()
    }).catch(e => {
        Message({
            message: data.userName + ' 登录失败 ' + e.message,
            type: 'error',
            duration: 5 * 1000
        })
    })
}

export function getInfo() {
    return {
        userName: '李磊',
        age: 18,
        avatar: require('@/assets/image/avatar.jpg')
    }
}

export function logout() {
    return request({
        url: '/logout',
        method: 'get'
    })
}

export function list() {
    return request({
        url: '/user/list',
        method: 'get'
    })
}
