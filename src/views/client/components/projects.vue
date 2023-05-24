<template>
    <el-row>
        <el-col>
            <h3 class="uppercase mb-1">Projects</h3>
        </el-col>
        <el-col :span="24">
            <el-row :gutter="12" type="flex" v-for="project in projects" :key="project.id">
                <div class="card cursor-pointer">
                    <router-link :to="`/projects/view/${project.slug}`">
                        <el-row type="flex" align="center">
                            <el-col :xs="24" :span="6" style="padding:15px">
                                <div class="featured_image">
                                    <img :src="project.featured_image" :alt="`${project.title} logo`">
                                </div>
                            </el-col>
                            <el-col :xs="24" :span="18">
                                <h3 class="flex justify-between mb-1">
                                    <span>
                                        {{ project.title }}
                                        <span class="text-darkgray" style="font-size: smaller;">@{{ project.company.name
                                        }}</span>
                                    </span>
                                    <i class="el-icon-right" />
                                </h3>
                                <div style="overflow: hidden;">
                                    <p v-html="project.content" class="mb-1"></p>
                                </div>
                                <ul class="flex wrap gap-1 skills">
                                    <li v-for="skill in project.skills" :key="skill.id">{{ skill.name }}</li>
                                </ul>
                            </el-col>
                        </el-row>
                    </router-link>
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