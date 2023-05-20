import request from '@/utils/request'

export function list(query) {
    
    return request({
        url: '/client/companies',
        method: 'get',
        params: query
    })
}

export function get(id) {
    return request({
        url: '/client/companies/' + id,
        method: 'get'
    })
}
