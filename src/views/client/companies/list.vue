<template>
    <div class="app-container">
        <Companies :companies="list" />
    </div>
</template>

<script>
import { list } from '@/api/client/companies'
import Companies from '../components/companies.vue'

export default {
    name: "ExperienceList",
    data() {
        return {
            list: [],
            total: 0,
            listLoading: true,
            listQuery: {
                page: 1,
                per_page: 5
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