<template>
  <div style="padding:30px;" class="text-gray">
    <transition name="aboutTransition">
      <div v-if="getAbout" class="mb-2" id="about-section">
        <About :about="getAbout" />
      </div>
    </transition>
    <div v-if="getCompanies" class="mb-2" id="about-section">
      <Companies :companies="getCompanies" />
    </div>
    <div v-if="getProjects" class="mb-2" id="about-section">
      <Projects :projects="getProjects" />
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
      projects: []
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
    }
  },
  components: { About, Companies, Projects }
})
</script>

<style lang="scss" scoped>
.aboutTransition-enter-active {
  transition: opacity 1.5s;
}

.aboutTransition-enter,
.aboutTransition-leave-to {
  opacity: 0;
}
</style>