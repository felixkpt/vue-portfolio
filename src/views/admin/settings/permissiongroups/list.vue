<template>
    <div class="app-container">
        <el-button type="primary" @click="handleAddRole">New Role</el-button>

        <el-table :data="rolesList" style="width: 100%;margin-top:30px;" border>
            <el-table-column align="center" label="Role Slug" width="220">
                <template slot-scope="scope">
                    {{ scope.row.slug }}
                </template>
            </el-table-column>
            <el-table-column align="center" label="Role Name" width="220">
                <template slot-scope="scope">
                    {{ scope.row.name }}
                </template>
            </el-table-column>
            <el-table-column align="header-center" label="Description">
                <template slot-scope="scope">
                    {{ scope.row.description }}
                </template>
            </el-table-column>
            <el-table-column align="center" label="Operations">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" @click="handleEdit(scope)">Edit</el-button>
                    <el-button type="danger" size="small" @click="handleDelete(scope)">Delete</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog :visible.sync="dialogVisible" :title="dialogType === 'edit' ? 'Edit Role' : 'New Role'">
            <el-form :model="role" label-width="80px" label-position="left">
                <el-form-item label="Name">
                    <el-input v-model="role.name" name="name" placeholder="Role Name" />
                </el-form-item>
                <el-form-item label="Desc">
                    <el-input v-model="role.description" name="description" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea"
                        placeholder="Role Description" />
                </el-form-item>
                <el-form-item label="Menus">
                    <el-tree ref="tree" name="permissions" :check-strictly="checkStrictly" :auto-expand-parent="true"
                        :default-expand-all="true" :data="routesData" node-key="path" :props="defaultProps" show-checkbox
                        class="permission-tree" />
                </el-form-item>
            </el-form>
            <div style="text-align:right;">
                <el-button type="danger" @click="dialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="confirmRole">Confirm</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import path from 'path'
import { deepClone } from '@/utils'
import { getRoutes, getRoles, addRole, deleteRole, updateRole } from '@/api/admin/role'

const defaultRole = {
    id: '',
    slug: '',
    name: '',
    description: '',
    routes: []
}

export default {
    data() {
        return {
            role: Object.assign({}, defaultRole),
            routes: [],
            permissions: [],
            rolesList: [],
            dialogVisible: false,
            dialogType: 'new',
            checkStrictly: false,
            defaultProps: {
                children: 'children',
                label: 'title'
            }
        }
    },
    computed: {
        routesData() {
            return this.routes
        }
    },
    created() {
        // Get all routes and roles list from server
        this.getRoutes()
        this.getRoles()
    },
    methods: {
        async getRoutes() {
            const res = await getRoutes()
            this.serviceRoutes = res.data

            const routes = this.generateRoutes(res.data, '/')

            this.routes = routes
            this.permissions = []
        },

        async getRoles() {
            const res = await getRoles()
            this.rolesList = res.data
        },

        // Reshape the routes structure so that it looks the same as the sidebar
        generateRoutes(routesInit, isRoutes = false) {
            const routes = []

            for (const index in routesInit) {

                const route = routesInit[index]
                // skip some route
                if (route.hidden) { continue }

                const data = {
                    path: route.path,
                    slug: route.slug,
                    methods: route.methods,
                    title: route.title,
                    children: []
                }

                let res = []
                if (route.routes?.length > 0) {
                    res = this.childrenWithRoutes(route.routes, true)

                    data.children = res
                }

                delete (route.routes)

                // recursive child routes
                if (route.children && Object.keys(route.children).length > 0) {
                    const children = this.generateRoutes(route.children)

                    data.children = [...data.children, ...children]
                }

                routes.push(data)
            }

            return routes
        },
        childrenWithRoutes(children) {
            const ouptput = []
            for (const index in children) {
                const child = children[index]

                if (child.routes?.length > 0) {
                    const res = this.generateRoutes(child.routes, true)

                    child.children = res
                }

                delete (child.routes)

                ouptput.push(child)
            }

            return this.generateRoutes(ouptput)
        },
        generatePermissions(routesInit, basePath = '/') {
            const permissions = []

            for (const route in routesInit) {
                // skip some route
                if (route.hidden) { continue }

                const data = {
                    path: path.resolve(basePath, route.path),
                    slug: route.slug
                }

                permissions.push({ path: data.path, slug: data.slug })

                // recursive child routes
                if (route.children) {
                    const children = []
                    route.children.forEach(child => {
                        const p = path.resolve(data.path + '/' + child.path, '')
                        const s = (data.slug + '.' + child.slug).replace(/\.+/g, '.')
                        children.push({ ...child, path: p, slug: s })
                    })

                    permissions.push(...this.generatePermissions(children, data.path))
                }
            }

            return permissions
        },

        generateArr(routes) {
            let data = []
            routes.forEach(route => {
                data.push(route)
                if (route.children) {
                    const temp = this.generateArr(route.children)
                    if (temp.length > 0) {
                        data = [...data, ...temp]
                    }
                }
            })
            return data
        },
        handleAddRole() {
            this.role = Object.assign({}, defaultRole)
            if (this.$refs.tree) {
                this.$refs.tree.setCheckedNodes([])
            }
            this.dialogType = 'new'
            this.dialogVisible = true
        },
        handleEdit(scope) {
            this.dialogType = 'edit'
            this.dialogVisible = true
            this.checkStrictly = false
            this.role = deepClone(scope.row)

            this.$nextTick(() => {
                const routesInit = JSON.parse(this.role.routes)
                const routes = []

                routesInit.forEach((route) => {

                    routes.push({ path: route })
                })

                this.$refs.tree.setCheckedNodes(routes)
                // set checked state of a node not affects its father and child nodes
                this.checkStrictly = false
            })
        },
        handleDelete({ $index, row }) {
            this.$confirm('Confirm to remove the role?', 'Warning', {
                confirmButtonText: 'Confirm',
                cancelButtonText: 'Cancel',
                type: 'warning'
            })
                .then(async () => {
                    const resp = await deleteRole(row._id)

                    if (resp.type === 'success') {
                        this.rolesList.splice($index, 1)
                        this.$message({
                            type: 'success',
                            message: resp.message
                        })
                    } else {
                        this.$message({
                            type: 'error',
                            message: resp.message
                        })
                    }
                })
                .catch(err => { console.error(err) })
        },
        generateTree(routes, basePath = '/', checkedKeys) {
            const res = []

            for (const route of routes) {
                const routePath = path.resolve(basePath, route.path)

                // recursive child routes
                if (route.children) {
                    route.children = this.generateTree(route.children, routePath, checkedKeys)
                }

                if (checkedKeys.includes(routePath) || (route.children && route.children.length >= 1)) {
                    res.push(route)
                }
            }
            return res
        },

        getCheckedRoutes(routes, checkedKeys) {
            const res = []

            for (const index in routes) {
                const route = routes[index]

                if (checkedKeys.some(child => child === route.path)) { res.push({ path: route.path, slug: route.slug }) }

                if (route.children) {
                    res.push(...this.getCheckedRoutes(route.children, checkedKeys))
                }
            }

            return res
        },

        async confirmRole() {
            const isEdit = this.dialogType === 'edit'

            const checkedKeys = this.$refs.tree.getCheckedKeys()

            const routes = this.getCheckedRoutes(this.routes, checkedKeys)

            this.role.routes = routes

            if (isEdit) {
                const { permissions, slugs, ...others } = this.role

                await updateRole(this.role._id, others)
                this.getRoles()
                for (let index = 0; index < this.rolesList.length; index++) {
                    if (this.rolesList[index]._id === this.role._id) {
                        this.rolesList.splice(index, 1, Object.assign({}, this.role))
                        break
                    }
                }
            } else {
                const { data } = await addRole(this.role)
                this.role.slug = data.slug
                this.rolesList.push(this.role)
            }

            const { description, slug, name } = this.role
            this.dialogVisible = false
            this.$notify({
                title: 'Success',
                dangerouslyUseHTMLString: true,
                message: `
            <div>Role Slug: ${slug}</div>
            <div>Role Name: ${name}</div>
            <div>Description: ${description}</div>
          `,
                type: 'success'
            })
        },
        // reference: src/view/layout/components/Sidebar/SidebarItem.vue
        onlyOneShowingChild(children = [], parent) {
            let onlyOneChild = null
            const showingChildren = children.filter(item => !item.hidden)

            // When there is only one child route, the child route is displayed by default
            if (showingChildren.length === 1) {
                onlyOneChild = showingChildren[0]
                onlyOneChild.path = path.resolve(parent.path, onlyOneChild.path)
                return onlyOneChild
            }

            // Show parent if there are no child route to display
            if (showingChildren.length === 0) {
                onlyOneChild = { ...parent, path: '', noShowingChildren: true }
                return onlyOneChild
            }

            return false
        }
    }
}
</script>

<style lang="scss" scoped>
.app-container {
    .roles-table {
        margin-top: 30px;
    }

    .permission-tree {
        margin-bottom: 30px;
    }
}
</style>
