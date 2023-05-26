import request from '@/utils/request'

export function list(query) {
    
    return request({
        url: '/client/qualifications',
        method: 'get',
        params: query
    })
}

export function get(id) {
    return request({
        url: '/client/qualifications/' + id,
        method: 'get'
    })
}
