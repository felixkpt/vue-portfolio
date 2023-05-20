import request from '@/utils/request'

export function list(query) {
    return request({
        url: '/admin/projects',
        method: 'get',
        params: query
    })
}

export function get(id) {
    return request({
        url: '/admin/projects/' + id,
        method: 'get'
    })
}

export function create(data) {
    return request({
        url: '/admin/projects',
        method: 'post',
        data
    })
}

export function update(data) {
    return request({
        url: '/admin/projects/update/' + data.id,
        method: 'post',
        data
    })
}
