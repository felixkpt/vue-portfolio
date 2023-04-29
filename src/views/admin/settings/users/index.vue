<template>
  <div class="app-container">
    <el-button type="primary" @click="handleAddUser">New User</el-button>

    <el-table :data="usersList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="User Name" width="180">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="User Email" width="220">
        <template slot-scope="scope">
          {{ scope.row.email }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="User Phone">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="Permission Group">
        <template slot-scope="scope">
          {{ scope.row.permission_group }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Operations">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">Edit</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType === 'edit' ? 'Edit User' : 'New User'">
      <el-form :model="user" label-width="80px" label-position="left">
        <el-form-item label="Name">
          <el-input v-model="user.name" placeholder="User Name" />
        </el-form-item>
        <el-form-item label="Email">
          <el-input v-model="user.email" placeholder="User Email" />
        </el-form-item>
        <el-form-item label="Phone">
          <el-input v-model="user.phone" placeholder="User Phone" />
        </el-form-item>
        <el-form-item label="Permission Group">
          <el-input v-model="user.permission_group" placeholder="Permission Group" />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="confirmUser">Confirm</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import path from 'path'
import { deepClone } from '@/utils'
import { getUsers, addUser, updateUser, deleteUser } from '@/api/admin/settings/user'
import { getRoles } from '@/api/admin/role'

const defaultUser = {
    id: '',
    name: '',
    email: '',
    phone: '',
    permission_group: ''
}

export default {
    data() {
        return {
            user: Object.assign({}, defaultUser),
            usersList: [],
            permission_group: [],
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
        permissionGroupData() {
            return this.permission_group
        }
    },
    created() {
        this.getUsers()
        this.getPermissionGroups()
    },
    methods: {
        async getUsers() {
            const res = await getUsers()
            this.usersList = res.data
        },
        async getPermissionGroups() {
            const res = await getRoles()
            this.serviceRoutes = res.data
            console.log(res.data, this.generateRoutes(res.data))
            this.routes = this.generateRoutes(res.data)
        },

        handleAddUser() {
            this.user = Object.assign({}, defaultUser)
            if (this.$refs.tree) {
                this.$refs.tree.setCheckedNodes([])
            }
            this.dialogType = 'new'
            this.dialogVisible = true
        },

        handleEdit(scope) {
            this.dialogType = 'edit'
            this.dialogVisible = true
            this.checkStrictly = true
            this.user = deepClone(scope.row)
            this.$nextTick(() => {
                const routes = JSON.parse(this.user.routes).map(route => ({ path: route }))
                this.$refs.tree.setCheckedNodes(routes)
                // set checked state of a node not affects its father and child nodes
                this.checkStrictly = false
            })
        },

        handleDelete({ $index, row }) {
            this.$confirm('Confirm to remove the user?', 'Warning', {
                confirmButtonText: 'Confirm',
                cancelButtonText: 'Cancel',
                type: 'warning'
            })
                .then(async() => {
                    const resp = await deleteUser(row.id)

                    if (resp.type === 'success') {
                        this.usersList.splice($index, 1)
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

        async confirmUser() {
            const isEdit = this.dialogType === 'edit'

            const checkedKeys = this.$refs.tree.getCheckedKeys()
            this.user.routes = this.generateTree(deepClone(this.serviceRoutes), '/', checkedKeys)

            const permissions = this.routesToUsers(this.user.routes)

            this.user.routes = permissions

            if (isEdit) {
                await updateUser(this.user.id, this.user)
                for (let index = 0; index < this.usersList.length; index++) {
                    if (this.usersList[index].id === this.user.id) {
                        this.usersList.splice(index, 1, Object.assign({}, this.user))
                        break
                    }
                }
            } else {
                const { data } = await addUser(this.user)
                this.user.slug = data.slug
                this.usersList.push(this.user)
            }

            const { description, slug, name } = this.user
            this.dialogVisible = false
            this.$notify({
                title: 'Success',
                dangerouslyUseHTMLString: true,
                message: `
            <div>User Slug: ${slug}</div>
            <div>User Name: ${name}</div>
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
  .users-table {
    margin-top: 30px;
  }

  .permission-tree {
    margin-bottom: 30px;
  }
}
</style>
