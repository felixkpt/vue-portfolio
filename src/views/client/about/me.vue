<template>
  <div class="app-container">
    <div v-if="getAbout" class="mb-2" id="about-section">
      <About :about="getAbout" />
      <el-row>
        <el-col :span="24">
          <p v-html="about.content" style="margin-top: 1rem;"></p>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { get } from '@/api/client/about'
import About from '../components/about.vue';

export default {
  name: "AboutMe",
  data() {
    return {
      about: {},
      total: 0,
      aboutLoading: true,
      aboutQuery: {
        page: 1,
        limit: 20
      }
    };
  },
  created() {
    this.fetchAbout();
  },
  methods: {
    async fetchAbout() {
      const res = await get();
      this.about = res.data;
    },
  },
  computed: {
    getAbout() {
      return this.about;
    }
  },
  components: { About }
}
</script>
