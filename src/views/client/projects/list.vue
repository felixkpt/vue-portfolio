<template>
  <div class="app-container">
    <Projects :projects="list" />
    <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
      @pagination="getList" :hide-on-single-page="true" />
  </div>
</template>

<script>
import { list } from '@/api/client/projects'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import Projects from '../components/projects.vue'

export default {
  name: 'ProjectsList',
  components: { Pagination, Projects },
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
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      }
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
    formatDate(d) {
      return d ? new Date(d).toLocaleString('en-us', { month: 'short', year: 'numeric' }) : 'Present'
    }
  }

}
</script>