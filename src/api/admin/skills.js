import request from '@/utils/request'

export function list(query) {
    
    return request({
        url: '/admin/skills',
        method: 'get',
        params: query
    })
}

export function get(id) {
    return request({
        url: '/admin/skills/' + id,
        method: 'get'
    })
}

export function create(data) {
    return request({
        url: '/admin/skills',
        method: 'post',
        data
    })
}

export function update(data, id) {
    return request({
        url: '/admin/skills/' + id,
        method: 'put',
        data
    })
}
export function toggleStatus(id) {
    return request({
        url: '/admin/skills/toggle-status/' + id,
        method: 'post',
    })
}
