import request from '@/utils/request'

export function list(query) {
    
    return request({
        url: '/client/contacts',
        method: 'get',
        params: query
    })
}

export function get(id) {
    return request({
        url: '/client/contacts/' + id,
        method: 'get'
    })
}

export function sendMessage(data) {
    return request({
        url: '/client/contacts/send-message',
        method: 'post',
        data
    })
}
