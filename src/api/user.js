import request from '@/utils/request'

export function getInfo(token) {
    return request({
        url: '/auth/token/' + token,
        method: 'get'
    })
}

export function updateProfile(data) {
    return request({
        url: '/users/user/profile',
        method: 'post',
        data
    })
}
