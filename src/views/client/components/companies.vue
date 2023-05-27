<template>
    <el-row>
        <el-col>
            <h3 class="uppercase mb-1">Experience</h3>
        </el-col>
        <el-col :span="24">
            <el-row :gutters="12" v-if="companies.length > 0">
                <div class="card cursor-pointer" v-for="company in companies" :key="company._id">
                    <a :href="company.url" target="_blank">
                        <el-row type="flexwrap">
                            <el-col :xs="24" :span="6">
                                <h4 class="text-lightgray">{{ `${formatDate(company.start_date)} —
                                                                    ${formatDate(company.end_date)}` }}
                                </h4>
                            </el-col>
                            <el-col :xs="24" :span="18">
                                <h3 class="flex justify-between align-center mb-1">
                                    <div class="flex justify-between align-center gap-1">
                                        <div class="company_logo">
                                            <img :src="company.logo" :alt="`${company.name} logo`">
                                        </div>
                                        {{ company.name }}
                                    </div>
                                    <svg-icon icon-class="link" />

                                </h3>
                                <h4 class="text-darkgray mb-1">{{ company.position }}</h4>
                                <p v-html="company.roles"></p>
                            </el-col>
                        </el-row>
                    </a>
                </div>
            </el-row>
            <el-row :gutters="12" v-else>
                <content-placeholders v-for="indx in [1, 2]" :key="indx" :animated="true" :rounded="true">
                    <el-row>
                        <el-col :span="6">
                            <content-placeholders-text :lines="1" />
                        </el-col>
                        <el-col :span="18">
                            <content-placeholders-heading :img="true" />
                            <content-placeholders-text :lines="3" />
                        </el-col>
                    </el-row>
                </content-placeholders>
            </el-row>
        </el-col>
    </el-row>
</template>
<script>
export default ({
    props: {
        companies: {
            Array
        }
    },
    methods: {
        formatDate(d) {
            return d ? new Date(d).toLocaleString("en-us", { month: "short", year: "numeric" }) : "Present";
        }
    }
})
</script>