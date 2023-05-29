<template>
    <div class="app-container">
        <el-row :gutter="20" align="middle" type="flex">
            <el-col :span="24" :md="20" type="success">
                <h2>{{ project.title }}</h2>
                <el-row align="middle" type="flex" gutter="15">
                    <el-col span="auto">
                        <el-row align="middle" type="flex" gutter="5" class="text-disabled">
                            <el-col span="auto">
                                <h4>@{{ project.company.name }}</h4>
                            </el-col>
                            <el-col span="auto">|</el-col>
                            <el-col span="auto">
                                <h5>{{ project.company.position }}</h5>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col span="auto" class="text-disabled">Start date: {{ project.start_date }}</el-col>
                    <el-col span="auto" class="text-disabled">End date: {{ project.end_date }}</el-col>
                </el-row>
            </el-col>
            <el-col :span="24" :md="4">
                <div class="flex wrap gap-1">
                    <div>
                        <el-link :href="project.project_url" target="_blank" type="primary">Project <svg-icon
                                icon-class="link" /></el-link>
                    </div>
                    <div>
                        <el-link :href="project.github_url" target="_blank" type="success">Github <svg-icon
                                icon-class="link" /></el-link>
                    </div>
                </div>
            </el-col>
        </el-row>
        <el-divider></el-divider>

        <el-row type="flex" align="center">
            <el-col :span="24" style="padding:15px">
                <el-row :gutter="20">
                    <el-col :span="24" :sm="9" :md="10" :lg="7">
                        <div class="featured_image">
                            <img :src="project.featured_image" :alt="`${project.title} logo`">
                        </div>
                    </el-col>
                    <el-col :span="24" :sm="15" :md="14" :lg="17">
                        <div>
                            <p v-html="project.content_short" class="mb-1"></p>
                        </div>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="24">
                <ul class="flex wrap gap-1 skills">
                    <li v-for="skill in [...project.skills]" :key="skill._id">{{ skill.name }}</li>
                </ul>
            </el-col>
        </el-row>
        <div style="margin-top: 2rem;" v-html="project.content"></div>
    </div>
</template>
<script>
import { get } from '@/api/client/projects'

export default {
    name: 'ProjectView',

    data() {
        return {
            project: {}
        }
    },
    created() {
        this.getPost()
    },
    methods: {
        getPost() {
            this.loading = true
            get(this.$route.params.slug).then(response => {
                this.project = response.data
                this.loading = false
            }).catch(error => {

                if (error.response.status == 404) return this.$router.push('/404')

            })
        }
    }

}

</script>
