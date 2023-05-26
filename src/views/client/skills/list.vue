<template>
  <div class="app-container">
    <div class="items_categories">
      <el-row justify="center" type="flex">
        <el-col>
          <h3 class="uppercase mb-1">Skills</h3>
        </el-col>
        <el-col>
          <el-row :gutters="12" v-if="list.length > 0">
            <div class="card" v-for="skills_category in list" :key="skills_category._id">
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
          </el-row>
          <el-row :gutters="22" v-else>
            <content-placeholders v-for="indx in [1, 2]" :key="indx" :animated="true" :rounded="true">
              <el-row>
                <el-col :span="12" style="padding: 1rem;">
                  <content-placeholders-heading :img="true" />
                  <div class="list flex wrap align-center gap-1 mb-1">
                    <div style="margin:1rem 0 0 2rem;width: 40%;">
                      <content-placeholders-text :lines="4" />
                    </div>
                  </div>
                </el-col>
                <el-col :span="12" style="padding: 1rem;">
                  <content-placeholders-heading :img="true" />
                  <div class="list flex wrap align-center gap-1 mb-1">
                    <div style="margin:1rem 0 0 2rem;width: 40%;">
                      <content-placeholders-text :lines="4" />
                    </div>
                  </div>
                </el-col>
              </el-row>
            </content-placeholders>
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
          limit: 20
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