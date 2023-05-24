import request from '@/utils/request'

export function get() {
    
    return request({
        url: '/client/resume',
        method: 'get',
    })
}

export function download() {
    return request({
        url: '/client/resume/download',
        method: 'post'
    })
}
