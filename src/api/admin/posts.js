import request from '@/utils/request'

export function fetchList(query) {
    return request({
        url: '/admin/posts',
        method: 'get',
        params: query
    })
}

export function fetchPost(id) {
    return request({
        url: '/admin/posts/' + id,
        method: 'get'
    })
}

export function fetchPv(pv) {
    return request({
        url: '/admin/posts/pv',
        method: 'get',
        params: { pv }
    })
}

export function createPost(data) {
    return request({
        url: '/admin/posts',
        method: 'post',
        data
    })
}

export function updatePost(data) {
    return request({
        url: '/admin/posts/update',
        method: 'post',
        data
    })
}
