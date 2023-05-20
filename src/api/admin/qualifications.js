import request from '@/utils/request'

export function list(query) {
    
    return request({
        url: '/admin/qualifications',
        method: 'get',
        params: query
    })
}

export function get(id) {
    return request({
        url: '/admin/qualifications/' + id,
        method: 'get'
    })
}

export function create(data) {
    return request({
        url: '/admin/qualifications',
        method: 'post',
        data
    })
}

export function update(data, id) {
    return request({
        url: '/admin/qualifications/' + id,
        method: 'put',
        data
    })
}
export function toggleStatus(id) {
    return request({
        url: '/admin/qualifications/toggle-status/' + id,
        method: 'post',
    })
}
