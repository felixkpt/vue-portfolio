<template>
  <div class="app-container">
    <el-row justify="end" align="right" type="flex">
      <div><el-button @click="addSkillCategory" class="el-button--primary el-button--large">Add
          skill category</el-button></div>
    </el-row>
    <skill-category-form-dialog :in-state-one='adding' :visible.sync='skillDialogOpen' :loading.sync='loading'
      :data='skillData' @confirm='confirmSkillCategory'>
    </skill-category-form-dialog>

    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" width="60">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Name">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" label="Importance">
        <template slot-scope="scope">
          <svg-icon v-for="n in +scope.row.importance" :key="n" icon-class="star" class="meta-item__icon" />
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
                <div @click="editSkillCategory(scope.row)">
                  <i class="el-icon-edit"></i> Edit
                </div>
              </el-dropdown-item>
              <el-dropdown-item>
                <div @click="changeStatus(scope.row.id)">
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

import { list, create, update, changeStatus } from '@/api/admin/skills-categories'
import SkillCategoryFormDialog from './SkillCategoryFormDialog'

export default {
  name: 'SkillsCategories',
  components: { Pagination, SkillCategoryFormDialog },
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
        id: 0,
        name: '',
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
    addSkillCategory() {
      this.adding = true
      this.skillDialogOpen = true
    },
    editSkillCategory(row) {
      this.skillData = { ...this.skillData, ...row }

      this.adding = false
      this.skillDialogOpen = true
    },
    async confirmSkillCategory(data) {

      this.loading = true

      if (this.adding) {

        await create(data).then(res => {
          this.skillDialogOpen = false
          this.$message(res.message)
          this.getList()

        }).finally(() => this.loading = false)

      } else {

        await update(data, data.id).then(res => {
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
