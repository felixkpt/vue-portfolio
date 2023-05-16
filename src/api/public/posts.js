import request from '@/utils/request'

export function fetchList(query) {
    return request({
        url: '/public/posts',
        method: 'get',
        params: query
    })
}

export function fetchPost(id) {
    return request({
        url: '/public/posts/' + id,
        method: 'get'
    })
}

export function fetchPv(pv) {
    return request({
        url: '/public/posts/pv',
        method: 'get',
        params: { pv }
    })
}

export function createPost(data) {
    return request({
        url: '/public/posts',
        method: 'post',
        data
    })
}

export function updatePost(data) {
    return request({
        url: '/public/posts/update',
        method: 'post',
        data
    })
}
