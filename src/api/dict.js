import request from '@/util/request'

// import { PAGE_NUM, PAGE_SIZE } from './constant'

export function list() {
    return request({
        url: '/api/dict/list'
    })
}

export function saveType(data) {
    return request({
        url: '/api/dict/type',
        method: 'post',
        data
    })
}

export function save(data) {
    return request({
        url: '/api/dict',
        method: 'post',
        data
    })
}

export function removeType(id) {
    return request({
        url: `/api/dict/type/${id}`,
        method: 'delete'
    })
}

export function remove(id) {
    return request({
        url: `/api/dict/${id}`,
        method: 'delete'
    })
}
