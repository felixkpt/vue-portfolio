<template>
    <div class="app-container">
        <el-row gutter="20" align="middle" type="flex">
            <el-col span="20" type="success">
                <h2>{{ post.title }}</h2>
                <el-row align="middle" type="flex" gutter="15">
                    <el-col span="auto">
                        <el-row align="middle" type="flex" gutter="5" class="text-disabled">
                            <el-col span="auto">
                                <h4>@Calltronix</h4>
                            </el-col>
                            <el-col span="auto">|</el-col>
                            <el-col span="auto">
                                <h5>Software Engineer</h5>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col span="auto" class="text-disabled">Start date: Jan 2023</el-col>
                    <el-col span="auto" class="text-disabled">End date: Jan 2023</el-col>
                </el-row>
            </el-col>
            <el-col span="4">
                <el-row gutter="10">
                    <el-col span="12">
                        <el-link :href="post.project_url" target="_blank" type="primary">Project Link <svg-icon
                                icon-class="link" /></el-link>
                    </el-col>
                    <el-col span="12">
                        <el-link :href="post.github_url" target="_blank" type="success">Github Link <svg-icon
                                icon-class="link" /></el-link>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-divider></el-divider>
        <div v-html="post.content"></div>
    </div>
</template>
<script>
import { fetchPost } from '@/api/client/projects'

export default {
    name: 'ProjectView',

    data() {
        return {
            post: {}
        }
    },
    created() {
        this.getPost()
    },
    methods: {
        getPost() {
            this.loading = true
            fetchPost(this.$route.params.slug).then(response => {
                this.post = response.data
                this.loading = false
            })
        }
    }

}

</script>
