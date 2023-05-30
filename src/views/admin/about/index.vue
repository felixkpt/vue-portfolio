<template>
  <div class="app-container">
    <el-row v-if="!listLoading && total === 0" justify="end" align="right" type="flex">
      <div><el-button @click="addAbout" class="el-button--primary el-button--large">Add
          about</el-button></div>
    </el-row>
    <about-form-dialog :in-state-one='adding' :visible.sync='aboutDialogOpen' :loading.sync='loading' :data='aboutData'
      @confirm='confirmAbout'>
    </about-form-dialog>

    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" width="60">
        <template slot-scope="scope">
          <span>{{ scope.row._id }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Featured image" min-width="220px">
        <template slot-scope="scope">
          <el-row align="center" type="flex">
            <el-col :span="24">
              <div class="item-logo"><img :src="scope.row.featured_image" alt="Featured image"></div>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Title">
        <template slot-scope="scope">
          <div>
            {{ `${scope.row.salutation ? scope.row.salutation + '. ' : ''}${scope.row.name}` }}
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Slogan">
        <template slot-scope="scope">
          <div v-html="scope.row.slogan"></div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Content Short" min-width="220px">
        <template slot-scope="scope">
          <div v-html="scope.row.content_short"></div>
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
            {{ row.status }}
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
                <div @click="editAbout(scope.row)">
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

  </div>
</template>

<script>

import { list, create, update, changeStatus } from '@/api/admin/about'
import AboutFormDialog from './AboutFormDialog'

export default {
  name: 'PostList',
  components: { AboutFormDialog },
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
      aboutDialogOpen: false,
      aboutData: {
        salutation: '',
        name: '',
        slogan: '',
        content_short: '',
        content: '',
        featured_image: '',
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
    addAbout() {
      this.adding = true
      this.aboutDialogOpen = true
    },
    editAbout(row) {
      this.aboutData = { ...this.aboutData, ...row }

      this.adding = false
      this.aboutDialogOpen = true
    },
    async confirmAbout(data) {

      this.loading = true

      if (this.adding) {

        await create(data).then(res => {
          this.aboutDialogOpen = false
          this.$message(res.message)
          this.getList()

        }).finally(() => this.loading = false)

      } else {

        await update(data, data._id).then(res => {
          this.aboutDialogOpen = false
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
