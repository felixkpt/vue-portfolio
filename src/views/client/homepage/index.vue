<template>
  <div style="padding:30px;" class="text-gray">

    <div class="mb-2">
      <el-row>
        <el-col :span="24">
          <h3 class="uppercase">About</h3>
          <p>
            Back in 2012, I decided to try my hand at creating custom Tumblr themes and tumbled head first into the rabbit
            hole
            of coding and web development. Fast-forward to today, and I’ve had the privilege of building software for an
            advertising agency, a start-up, a student-led design studio, and a huge corporation.
          </p>
          <p>
            My main focus these days is building products and leading companies for our clients at Upstatement. In my free
            time
            I've also released an online video course that covers everything you need to know to build a web app with the
            Spotify API.
          </p>
          <p>
            When I’m not at the computer, I’m usually rock climbing, hanging out with my wife and two cats, or running
            around
            Hyrule searching forKorok seeds
          </p>
        </el-col>
      </el-row>
    </div>

    <div class="mb-2">
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

    <div class="mb-2">
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
import { list as listCompanies } from '@/api/client/companies'
import { list as listProjects } from '@/api/client/projects'

export default ({

  data() {
    return {
      companies: [],
      projects: []
    }
  },
  computed: {
    getCompanies() {
      return this.companies
    },
    getProjects() {
      return this.projects
    }
  },
  created() {
    this.fetchCompanies()
    this.fetchProjects()
  },
  methods: {
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
<style lang="scss">
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
</style>