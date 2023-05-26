<template>
  <div class="app-container">
    <el-row justify="end" align="right" type="flex">
      <div><el-button @click="addSkill" class="el-button--primary el-button--large">Add
          skill</el-button></div>
    </el-row>
    <skill-form-dialog :in-state-one='adding' :visible.sync='skillDialogOpen' :loading.sync='loading' :data='skillData'
      @confirm='confirmSkill'>
    </skill-form-dialog>

    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" width="60">
        <template slot-scope="scope">
          <span>{{ scope.row._id }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Name">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Start Date">
        <template slot-scope="scope">
          <span>{{ scope.row.start_date }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Level">
        <template slot-scope="scope">
          <span>{{ scope.row.level }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Category">
        <template slot-scope="scope">
          <span>{{ scope.row.skill_category.name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Created At">
        <template slot-scope="scope">
          <span>{{ new Intl.DateTimeFormat("en-US").format(new Date(scope.row.created_at)) }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Author">
        <template slot-scope="scope">
          <span>{{ scope.row.user.name }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="Status" width="110">
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusFilter">
            {{ row.status ? 'Active' : 'Inactive' }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Actions" width="120">
        <template slot-scope="scope">
          <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
            <div class="avatar-wrapper">
              <i class="el-icon-caret-bottom" />
              <svg-icon icon-class="nested" />
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <div @click="editSkill(scope.row)">
                  <i class="el-icon-edit"></i> Edit
                </div>
              </el-dropdown-item>
              <el-dropdown-item>
                <div @click="changeStatus(scope.row._id)">
                  <i class="el-icon-turn-off" /> {{ scope.status ? 'Deactivate' : 'Activate' }}
                </div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
      @pagination="getList" />
  </div>
</template>

<script>

import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

import { list, create, update, changeStatus } from '@/api/admin/skills'
import SkillFormDialog from './SkillFormDialog'

export default {
  name: 'PostList',
  components: { Pagination, SkillFormDialog },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      },
      dialogOpen: false,
      adding: false,
      data: {},
      skillDialogOpen: false,
      skillData: {
        name: '',
        start_date: '',
        level: '',
        skills_category_id: '',
        logo: '',
        importance: 0
      },
      loading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      list(this.listQuery).then(response => {
        this.list = response.data.data
        this.total = response.data.total
        this.listLoading = false
      })
    },
    addSkill() {
      this.adding = true
      this.skillDialogOpen = true
    },
    editSkill(row) {
      this.skillData = { ...this.skillData, ...row }

      this.adding = false
      this.skillDialogOpen = true
    },
    async confirmSkill(data) {

      this.loading = true

      if (this.adding) {

        await create(data).then(res => {
          this.skillDialogOpen = false
          this.$message(res.message)
          this.getList()

        }).finally(() => this.loading = false)

      } else {

        await update(data, data._id).then(res => {
          this.skillDialogOpen = false
          this.$message(res.message)
          this.getList()

        }).finally(() => this.loading = false)

      }

    },
    async changeStatus(id) {
      await changeStatus(id).then(res => {
        this.$message(res.message)
        this.getList()
      })
    }

  }
}
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}

.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
