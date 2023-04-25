import request from '@/utils/request'

export function getUsers() {
    return request({
        url: '/admin/settings/users/list',
        method: 'get'
    })
}

export function addUser(data) {
    return request({
        url: '/users/user/profile',
        method: 'post',
        data
    })
}

export function updateUser(roles) {
    console.log(roles)

    return request({
        url: '/auth/user/roles',
        method: 'post'
    })
}

export function deleteUser(roles) {
    console.log(roles)

    return request({
        url: '/auth/user/roles',
        method: 'post'
    })
}
