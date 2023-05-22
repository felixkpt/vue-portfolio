<template>
  <div class="app-container">
    <div v-if="list" class="mb-2">
      <div v-if="list" class="mb-2" id="about-section">
      <Companies :companies="list" />
    </div>
    </div>
  </div>
</template>

<script>
import { list } from '@/api/client/companies'
import Companies from '../components/companies.vue'

export default {
    name: "ExperienceList",
    data() {
        return {
            list: null,
            total: 0,
            listLoading: true,
            listQuery: {
                page: 1,
                limit: 20
            }
        };
    },
    created() {
        this.getList();
    },
    methods: {
        getList() {
            this.listLoading = true;
            list(this.listQuery).then(response => {
                this.list = response.data.data;
                this.total = response.data.total;
                this.listLoading = false;
            });
        },
        formatDate(d) {
            return d ? new Date(d).toLocaleString("en-us", { month: "short", year: "numeric" }) : "Present";
        }
    },
    components: { Companies }
}
</script>