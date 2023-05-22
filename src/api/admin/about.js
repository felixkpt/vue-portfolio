import request from '@/utils/request'

export function list(query) {
    
    return request({
        url: '/admin/about',
        method: 'get',
        params: query
    })
}

export function get(id) {
    return request({
        url: '/admin/about/' + id,
        method: 'get'
    })
}

export function create(data) {
    return request({
        url: '/admin/about',
        method: 'post',
        data
    })
}

export function update(data, id) {
    return request({
        url: '/admin/about/' + id,
        method: 'put',
        data
    })
}
export function changeStatus(id) {
    return request({
        url: '/admin/about/change-status/' + id,
        method: 'post',
    })
}
