<template>
  <div class="app-container">
    <div class="items_categories">
      <el-row justify="center" type="flex">
        <el-col>
          <h3 class="uppercase mb-1">Skills</h3>
        </el-col>
        <el-col style="padding: 12px 0;" :span="12" v-for="skills_category in list" :key="skills_category.id">
          <div class="card">
            <h4 class="flex wrap align-center gap-1 mb-1">
              <div class="before"><img :src="skills_category.featured_image" alt=""></div>
              <div>{{ skills_category.name }}</div>
            </h4>
            <div class="list flex wrap align-center gap-1 mb-1">
              <ul>
                <li v-for="skill in skills_category.skills" :key="skill.id">
                  <i class="el-icon-circle-check" /><span>{{ skill.name }}</span>
                </li>
              </ul>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { SkillBar } from 'vue-skill-bar'
import { list } from '@/api/client/skills-categories'

export default (
  {
    name: 'SkillsList',
    components: {
      'skill-bar': SkillBar
    },
    data() {
      return {
        list: null,
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