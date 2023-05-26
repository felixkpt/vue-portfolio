<template>
  <div class="app-container">
    <div class="text-gray">
      <div v-if="getAbout" class="mb-4 about-section">
        <About :about="getAbout" />
      </div>
      <div v-if="getCompanies" class="mb-4 companies-section">
        <Companies :companies="getCompanies" />
      </div>
      <div v-if="getProjects" class="mb-4 projects-section">
        <Projects :projects="getProjects" />
      </div>

      <div style="position: relative;">
        <el-form v-if="url" :action="`${url}/client/resume/download`" method="post" class="form-container">
          <div style="position: fixed;bottom: 0.5rem;right: 0.5rem;">
            <transition name="fade" mode="out-in">
              <div id="downloadResume" style="transform: translateX(150%);transition:all 1.2s ease-in-out;">
                <el-row>
                  <el-col>
                    <el-button native-type="submit" v-loading="loading" style="float: right;" type="success">
                      <i class="el-icon-download" /> Download Resume
                    </el-button>
                  </el-col>
                </el-row>
              </div>
            </transition>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { get as getAbout } from '@/api/client/about'
import { list as listCompanies } from '@/api/client/companies'
import { list as listProjects } from '@/api/client/projects'
import About from '../components/about.vue'
import Companies from '../components/companies.vue'
import Projects from '../components/projects.vue'

export default ({
  data() {
    return {
      about: {},
      companies: [],
      projects: [],
      loading: false,
      url: ''
    };
  },
  computed: {
    getAbout() {
      return this.about;
    },
    getCompanies() {
      return this.companies;
    },
    getProjects() {
      return this.projects;
    }
  },
  created() {
    this.url = process.env.VUE_APP_BASE_API
    this.fetchAbout();
    this.fetchCompanies();
    this.fetchProjects();
  },
  methods: {
    async fetchAbout() {
      const res = await getAbout();
      this.about = res.data;
    },
    async fetchCompanies() {
      const res = await listCompanies({ all: 1 });
      this.companies = res;
    },
    async fetchProjects() {
      const res = await listProjects({ all: 1 });
      this.projects = res;
      setTimeout(() => document.querySelector(`#downloadResume`).style.transform = 'translateX(0)', 3000);
    },
  },
  components: { About, Companies, Projects }
})
</script>