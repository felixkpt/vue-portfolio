<template>
  <div class="app-container">
    <div class="items_categories">
      <el-row justify="center" type="flex">
        <el-col>
          <h3 class="uppercase mb-1">Skills</h3>
        </el-col>
        <el-col>
          <el-row :gutters="12" v-if="list.length > 0" justify="center" type="flex">
            <el-col :span="24" :md="12" :lg="8" v-for="skills_category in list" :key="skills_category._id">
              <div class="card">
                <h4 class="flex wrap align-center gap-1 mb-1">
                  <div class="before"><img :src="skills_category.featured_image" alt=""></div>
                  <div>{{ skills_category.name }}</div>
                </h4>
                <div class="list flex wrap align-center gap-1 mb-1">
                  <ul>
                    <li v-for="skill in skills_category.skills" :key="skill._id">
                      <i class="el-icon-circle-check" /><span>{{ skill.name }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutters="12" v-else justify="center" type="flex">
            <el-col :span="24" :md="12" :lg="8" v-for="indx in [1, 2, 3, 4]" :key="indx">
              <content-placeholders :animated="true" :rounded="true">
                <div class="card">
                  <h4 class="mb-1" style="width: 60%;">
                    <content-placeholders-heading :img="true" />
                  </h4>
                  <div class="list mb-1">
                    <content-placeholders-text :lines="4" />
                  </div>
                </div>
              </content-placeholders>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { list } from '@/api/client/skills-categories'

export default (
  {
    name: 'SkillsList',
    data() {
      return {
        list: [],
        total: 0,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 5
        },
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
      }
    },
  }
)
</script>
<style scoped>
.vue-content-placeholders-heading__img {
  width: 2.5rem;
  height: 2.5rem;
}
</style>