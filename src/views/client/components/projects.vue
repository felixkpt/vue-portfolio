<template>
    <el-row>
        <el-col>
            <h3 class="uppercase">Projects</h3>
        </el-col>
        <el-col :span="24">
            <el-row :gutter="12" type="flex" v-for="project in projects" :key="project.id">
                <div class="card cursor-pointer">
                    <a :href="project.project_url" target="_blank">
                        <el-row type="flex" align="center">
                            <el-col :xs="24" :span="6" style="padding:15px">
                                <div class="featured_image">
                                    <img :src="project.featured_image" :alt="`${project.title} logo`">
                                </div>
                            </el-col>
                            <el-col :xs="24" :span="18">
                                <h3 class="flex justify-between">
                                    <span>
                                        {{ project.title }}
                                        <span class="text-darkgray" style="font-size: smaller;">@{{ project.company.name
                                        }}</span>
                                    </span>
                                    <svg-icon icon-class="link" />
                                </h3>
                                <p v-html="project.content"></p>
                                <ul class="flex wrap gap-1 skills">
                                    <li v-for="skill in project.skills" :key="skill.id">{{ skill.name }}</li>
                                </ul>
                            </el-col>
                        </el-row>
                    </a>
                </div>
            </el-row>
        </el-col>
    </el-row>
</template>
<script>
export default ({
    props: {
        projects: {
            Object
        }
    }, methods: {
        formatDate(d) {
            return d ? new Date(d).toLocaleString("en-us", { month: "short", year: "numeric" }) : "Present";
        }
    }
})
</script>