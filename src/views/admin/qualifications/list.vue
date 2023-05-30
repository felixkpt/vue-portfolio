<template>
  <div class="app-container">
    <el-row justify="end" align="right" type="flex">
      <div><el-button @click="addSkill" class="el-button--primary el-button--large">Add
          qualification</el-button></div>
    </el-row>
    <qualification-form-dialog :in-state-one='adding' :visible.sync='qualificationDialogOpen' :loading.sync='loading'
      :data='qualificationData' @confirm='confirmAnimal'>
    </qualification-form-dialog>

    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" width="60">
        <template slot-scope="scope">
          <span>{{ scope.row._id }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Institution" min-width="220px">
        <template slot-scope="scope">
          <el-row align="center" type="flex">
            <el-col :span="5">
              <div class="item-logo"><img :src="scope.row.featured_image" alt="Featured image"></div>
            </el-col>
            <el-col :span="19" style="margin-block: auto;"><span>{{ scope.row.institution }}</span></el-col>
          </el-row>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Course">
        <template slot-scope="scope">
          <span>{{ scope.row.course }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Qualification">
        <template slot-scope="scope">
          <span>{{ scope.row.qualification }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Start Date">
        <template slot-scope="scope">
          <span>{{ scope.row.start_date }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="End Date">
        <template slot-scope="scope">
          <span>{{ scope.row.end_date }}</span>
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

import { list, create, update, changeStatus } from '@/api/admin/qualifications'
import QualificationFormDialog from './QualificationFormDialog'

export default {
  name: 'PostList',
  components: { Pagination, QualificationFormDialog },
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
        per_page: 10
      },
      dialogOpen: false,
      adding: false,
      data: {},
      qualificationDialogOpen: false,
      qualificationData: {
        institution: '',
        course: '',
        qualification: '',
        start_date: '',
        end_date: '',
        featured_image: '',
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
      this.qualificationDialogOpen = true
    },
    editSkill(row) {
      this.qualificationData = { ...this.qualificationData, ...row }

      this.adding = false
      this.qualificationDialogOpen = true
    },
    async confirmAnimal(data) {

      this.loading = true

      if (this.adding) {

        await create(data).then(res => {
          this.qualificationDialogOpen = false
          this.$message(res.message)
          this.getList()

        }).finally(() => this.loading = false)

      } else {

        await update(data, data._id).then(res => {
          this.qualificationDialogOpen = false
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
