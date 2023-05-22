<template>
    <el-row>
        <el-col>
            <h3 class="uppercase">Experience</h3>
        </el-col>
        <el-col :span="24">
            <el-row :gutter="12" type="flexwrap" v-for="company in companies" :key="company.id">
                <div class="card cursor-pointer">
                    <el-row type="flexwrap">
                        <el-col :xs="24" :span="6">
                            <h4 class="text-lightgray">{{ `${formatDate(company.start_date)} —
                                                            ${formatDate(company.end_date)}` }}
                            </h4>
                        </el-col>
                        <el-col :xs="24" :span="18">

                            <h3 class="flex justify-between">
                                <div class="flex justify-between align-center gap-1">
                                    <div class="company_logo">
                                        <img :src="company.logo" :alt="`${company.name} logo`">
                                    </div>
                                    {{ company.name }}
                                </div>
                                <svg-icon icon-class="link" />

                            </h3>
                            <h4 class="text-darkgray">{{ company.position }}</h4>
                            <p v-html="company.roles"></p>
                        </el-col>
                    </el-row>
                </div>
            </el-row>
        </el-col>
    </el-row>
</template>
<script>
export default ({
    props: {
        companies: {
            Object
        }
    },
    methods: {
        formatDate(d) {
            return d ? new Date(d).toLocaleString("en-us", { month: "short", year: "numeric" }) : "Present";
        }
    }
})
</script>