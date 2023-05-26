import request from '@/utils/request'

export function list(query) {
    
    return request({
        url: '/client/skills-categories',
        method: 'get',
        params: query
    })
}

export function get(id) {
    return request({
        url: '/client/skills-categories/' + id,
        method: 'get'
    })
}