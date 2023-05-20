<template>
  <div style="padding:30px;" class="text-gray">

    <div v-if="getAbout" class="mb-2" id="about-section">
      <h3 class="uppercase">{{ about.title }}</h3>
      <h4>{{ about.slogan  }}</h4>
      <el-row>
        <el-col :span="16">
          <p v-html="about.content_short"></p>
        </el-col>
        <el-col :span="8">
          <div class="about-logo"><img :src="about.featured_image" :alt="about.title"></div>
        </el-col>

      </el-row>
    </div>

    <div v-if="getCompanies" class="mb-2">
      <el-row>
        <el-col>
          <h3 class="uppercase">Experience</h3>
        </el-col>
        <el-col :span="24">
          <el-row :gutter="12" type="flexwrap" v-for="company in getCompanies" :key="company.id">
            <div class="card cursor-pointer">
              <el-row type="flexwrap">
                <el-col :xs="24" :span="6">
                  <h4 class="text-lightgray">{{ `${formatDate(company.start_date)} — ${formatDate(company.end_date)}` }}
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
    </div>

    <div v-if="getProjects" class="mb-2">
      <el-row>
        <el-col>
          <h3 class="uppercase">Projects</h3>
        </el-col>
        <el-col :span="24">
          <el-row :gutter="12" type="flex" v-for="project in getProjects" :key="project.id">
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
                        <span class="text-darkgray" style="font-size: smaller;">@{{ project.company.name }}</span>
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
    </div>

  </div>
</template>

<script>
import { get as getAbout } from '@/api/client/about'
import { list as listCompanies } from '@/api/client/companies'
import { list as listProjects } from '@/api/client/projects'

export default ({

  data() {
    return {
      about: {},
      companies: [],
      projects: []
    }
  },
  computed: {
    getAbout() {
      return this.about
    },
    getCompanies() {
      return this.companies
    },
    getProjects() {
      return this.projects
    }
  },
  created() {
    this.fetchAbout()
    this.fetchCompanies()
    this.fetchProjects()
  },
  methods: {
    async fetchAbout() {
      const res = await getAbout()
      this.about = res.data
    },
    async fetchCompanies() {
      const res = await listCompanies({ all: 1 })
      this.companies = res
    },
    async fetchProjects() {
      const res = await listProjects({ all: 1 })
      this.projects = res
    },
    formatDate(d) {
      return d ? new Date(d).toLocaleString('en-us', { month: 'short', year: 'numeric' }) : 'Present'
    }
  }

})
</script>
<style lang="scss" scoped>
:root {
  --shadow-color: transparent;
  --shadow: inset 0 -1px 2px 0 rgba(148, 163, 184, .1);
  --shadow-colored: inset 0 -1px 2px 0 var(--shadow-color);
  --ring-shadow: 0 0 #0000;
  --ring-color: rgba(59, 130, 246, .5);
  --ring-offset-shadow: 0 0 #0000;
}

.card {
  padding: 1rem;
  border-radius: 5px;
  background: transparent !important;
  box-shadow: var(--ring-offset-shadow, 0 0 #0000), var(--ring-shadow, 0 0 #0000), var(--shadow) !important;

  &:hover {
    background: rgba(30, 41, 59, .5) !important;
  }

  &:hover h3 {
    color: rgb(94 234 212);
  }

  &:hover .featured_image {
    transform: scale(1.01);
  }

  transition-property: color,
  background-color,
  border-color,
  text-decoration-color,
  fill,
  stroke,
  opacity,
  box-shadow,
  transform,
  filter,
  backdrop-filter;
  transition-timing-function: cubic-bezier(.4, 0, .2, 1);
  transition-duration: .15s;
}

.text-lightgray {
  color: rgb(100 116 139);
}

.text-gray {
  color: rgb(148 163 184);
}

.text-darkgray {
  color: rgb(82 97 116);
}

.cursor-pointer:hover {
  cursor: pointer;
}

.uppercase {
  text-transform: uppercase;
}

.flex {
  display: flex;
}

.wrap {
  flex-wrap: wrap;
}

.justify-between {
  justify-content: space-between;
}

.w-100 {
  width: 100%;
}

.align-center {
  align-items: center;
}

.gap-1 {
  gap: 1rem;
}

.gap-2 {
  gap: 2rem;
}

.skills {
  list-style: none;
  margin: 0;
  padding: 0;

  li {
    padding: 3px 5px;
    border-radius: 7px;
    border: solid 1px #4b635f;
    color: #5eead4;
    background: rgb(114 117 125 / 30%);
  }
}

.company_logo {
  width: 4rem;
  height: 3rem;
  border-radius: 5px;
  background-color: rgb(114 117 125 / 30%);
  transition: transform .15s ease-in-out;

  img {
    width: 4rem;
    height: 3rem;
    border-radius: 5px;

  }
}

.featured_image {
  width: min(100%, 18rem);
  height: 12rem;
  margin: auto;
  border-radius: 5px;
  background-color: rgb(114 117 125 / 30%);
  transition: transform .15s ease-in-out;

  img {
    width: min(100%, 18rem);
    height: 12rem;
    border-radius: 5px;

  }
}

.mb-2 {
  margin-bottom: 2rem;
}

.about-logo {
  width: 100%;
  border-radius: 50%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 17rem;
    height: 17rem;
    border-radius: 50%;
    max-width: 450px;
  }
}
</style>