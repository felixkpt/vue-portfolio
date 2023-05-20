import request from '@/utils/request'

export function list(query) {
    
    return request({
        url: '/client/about',
        method: 'get',
        params: query
    })
}

export function get(id) {
    return request({
        url: '/client/about/' + id,
        method: 'get'
    })
}
