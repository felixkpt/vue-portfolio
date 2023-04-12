import request from '@/utils/request'

const { deepClone } = require('@/utils')
const { asyncRoutes, constantRoutes } = require('./routes')

const routes = deepClone([...constantRoutes, ...asyncRoutes])

export function getRoutes() {
    return { data: routes }

    return request({
        url: '/admin/departments/routes',
        method: 'get'
    })
}

export function getRoles() {

    return {
        data:
            [
                {
                    "key": "admin",
                    "name": "admin",
                    "path": "admin",
                    "description": "Super Administrator. Have access to view all pages.",
                    "routes": routes
                },
                {
                    "key": "editor",
                    "name": "editor",
                    "path": "editor",
                    "description": "Normal Editor. Can see all pages except permission page",
                    "routes": routes.filter(i => !['/permission', '/excel', '/error', '/error-log', '/zip'].includes(i.path))// just a mock
                },
                {
                    "key": "visitor",
                    "name": "visitor",
                    "path": "visotor",
                    "description": "Just a visitor. Can only see the home page and the document page",
                    "routes": [{
                        path: '',
                        redirect: 'dashboard',
                        children: [
                            {
                                path: 'dashboard',
                                name: 'Dashboard',
                                meta: { title: 'dashboard', icon: 'dashboard' }
                            }
                        ]
                    }]
                }
            ]
    }

    return request({
        url: '/roles',
        method: 'get'
    })
}

export function addRole(data) {
    return request({
        url: '/role',
        method: 'post',
        data
    })
}

export function updateRole(id, data) {
    return request({
        url: `/role/${id}`,
        method: 'put',
        data
    })
}

export function deleteRole(id) {
    return request({
        url: `/role/${id}`,
        method: 'delete'
    })
}
