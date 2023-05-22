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
export function changeStatus(id) {
    return request({
        url: '/admin/skills/change-status/' + id,
        method: 'post',
    })
}
