import request from '@/util/request'

export function getMenu() {
    return request({
        url: '/list',
        method: 'get'
    })
}