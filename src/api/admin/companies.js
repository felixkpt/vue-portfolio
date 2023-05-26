import request from '@/utils/request'

export function list(query) {
    
    return request({
        url: '/admin/companies',
        method: 'get',
        params: query
    })
}

export function get(id) {
    return request({
        url: '/admin/companies/' + id,
        method: 'get'
    })
}

export function create(data) {
    return request({
        url: '/admin/companies',
        method: 'post',
        data
    })
}

export function update(data, id) {
    return request({
        url: '/admin/companies/' + id,
        method: 'put',
        data
    })
}
export function changeStatus(id) {
    return request({
        url: '/admin/companies/change-status/' + id,
        method: 'post',
    })
}
