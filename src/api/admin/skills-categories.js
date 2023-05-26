import request from '@/utils/request'

export function list(query) {
    
    return request({
        url: '/admin/skills-categories',
        method: 'get',
        params: query
    })
}

export function get(id) {
    return request({
        url: '/admin/skills-categories/' + id,
        method: 'get'
    })
}

export function create(data) {
    return request({
        url: '/admin/skills-categories',
        method: 'post',
        data
    })
}

export function update(data, id) {
    return request({
        url: '/admin/skills-categories/' + id,
        method: 'put',
        data
    })
}
export function changeStatus(id) {
    return request({
        url: '/admin/skills-categories/change-status/' + id,
        method: 'post',
    })
}
