import request from '@/utils/request'

export function list(query) {
    
    return request({
        url: '/client/skills',
        method: 'get',
        params: query
    })
}

export function get(id) {
    return request({
        url: '/client/skills/' + id,
        method: 'get'
    })
}