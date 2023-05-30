<template>
  <div class="app-container">
    <el-row justify="end" align="right" type="flex">
      <div><el-button @click="addCompany" class="el-button--primary el-button--large">Add
          company</el-button></div>
    </el-row>
    <company-form-dialog :in-state-one='adding' :visible.sync='companyDialogOpen' :loading.sync='loading'
      :data='companyData' @confirm='confirmAnimal'>
    </company-form-dialog>

    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" width="60">
        <template slot-scope="scope">
          <span>{{ scope.row._id }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Name" min-width="220px">
        <template slot-scope="scope">
          <el-row align="center" type="flex">
            <el-col :span="5"><div class="item-logo"><img :src="scope.row.logo" alt="Item logo"></div></el-col>
            <el-col :span="19" style="margin-block: auto;"><span>{{ scope.row.name }}</span></el-col>
          </el-row>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Position" min-width="180px">
        <template slot-scope="scope">
          <span>{{ scope.row.position }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Start date">
        <template slot-scope="scope">
          <span>{{ scope.row.start_date }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="End date">
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
                <div @click="editCompany(scope.row)">
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

import { list, create, update, changeStatus } from '@/api/admin/companies'
import CompanyFormDialog from './CompanyFormDialog'

export default {
  name: 'PostList',
  components: { Pagination, CompanyFormDialog },
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
        limit: 10
      },
      dialogOpen: false,
      adding: false,
      data: {},
      companyDialogOpen: false,
      companyData: {
        name: '',
        url: '',
        logo: '',
        position: '',
        roles: '',
        start_date: '',
        end_date: '',
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
    addCompany() {
      this.adding = true
      this.companyDialogOpen = true
    },
    editCompany(row) {
      this.companyData = { ...this.companyData, ...row }

      this.adding = false
      this.companyDialogOpen = true
    },
    async confirmAnimal(data) {

      this.loading = true

      if (this.adding) {
        console.log(data)
        await create(data).then(res => {
          this.companyDialogOpen = false
          this.$message(res.message)
          this.getList()

        }).finally(() => this.loading = false)

      } else {

        await update(data, data._id).then(res => {
          this.companyDialogOpen = false
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

<style lang="scss" scoped>
.edit-input {
  padding-right: 100px;
}

.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}

</style>
