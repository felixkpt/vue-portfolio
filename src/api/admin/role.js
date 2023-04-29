import request from '@/utils/request'

const { deepClone } = require('@/utils')
const { asyncRoutes, constantRoutes } = require('./routes')

const routes = deepClone([...constantRoutes, ...asyncRoutes])

export function getRoutes() {
    return request({
        url: '/admin/settings/permissiongroups/routes',
        method: 'get'
    })
}

export function getRoles() {
    return request({
        url: '/admin/settings/permissiongroups',
        method: 'get'
    })
}

export function addRole(data) {
    return request({
        url: '/admin/settings/permissiongroups',
        method: 'post',
        data
    })
}

export function updateRole(id, data) {
    return request({
        url: `/admin/settings/permissiongroups/${id}`,
        method: 'put',
        data
    })
}

export function deleteRole(id) {
    return request({
        url: `/admin/settings/permissiongroups/${id}`,
        method: 'delete'
    })
}
