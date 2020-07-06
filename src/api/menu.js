import request from '@/util/request'

export function list() {
    return request({
        url: '/menu/list',
        method: 'get'
    })
}